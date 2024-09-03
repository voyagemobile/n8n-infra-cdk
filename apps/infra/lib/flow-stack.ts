import * as kubectlv28 from '@aws-cdk/lambda-layer-kubectl-v28';
import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import type { Construct, IDependable } from 'constructs';
import type { N8nConfigValues } from '../types';

/**
 * Defines the infrastructure for the workflow services using Amazon EKS.
 */
export class FlowStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Provision EKS cluster and deploy the workflow services
		const cluster = this.createCluster();
		this.configureAddons(cluster);
		// this.createRedis(cluster);

		// helm install my-n8n oci://8gears.container-registry.com/library/n8n --version 0.23.1
		const flowHelm = new eks.HelmChart(this, 'Flow', {
			cluster,
			createNamespace: true,
			namespace: 'flow',
			chart: 'oci://8gears.container-registry.com/library/n8n',
			repository: 'oci://8gears.container-registry.com/library/n8n',
			version: '0.23.1',
			values: {
				n8n: {
					encryption_key: 'n8n',
				},
				scaling: {
					webhook: {
						count: 1,
					},
					worker: {
						count: 1,
					},
					enabled: true,
					redis: {
						host: 'redis-service',
					},
				},
				autoscaling: {
					enabled: true,
					maxReplicas: 4,
					minReplicas: 1,
				},
				database: {
					type: 'postgres',
					postgresdb: {
						host: '<DB_HOST>',
						password: '<REDACTED>',
						schema: 'flow',
						database: '<DB_NAME>',
						user: '<DB_USER>',
						ssl: {
							rejectUnauthorized: false,
						},
					},
				},
			} satisfies N8nConfigValues,
		});

		// const ingress = this.createIngress(cluster, [flowHelm]);
		// this.createRoute53RecordForIngress(cluster, [ingress]);
	}

	private createCluster(): eks.Cluster {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const isProduction = process.env.ENVIRONMENT_NAME! === 'production';
		return new eks.Cluster(this, 'FlowCluster', {
			clusterName: 'flow-cluster',
			defaultCapacity: isProduction ? 16 : 1,
			defaultCapacityInstance: new cdk.aws_ec2.InstanceType(isProduction ? 'm5.large' : 't2.medium'),
			version: eks.KubernetesVersion.V1_29,
			albController: {
				version: cdk.aws_eks.AlbControllerVersion.V2_6_2,
			},
			kubectlLayer: new kubectlv28.KubectlV28Layer(this, 'KubectlLayer'),
		});
	}

	private configureAddons(cluster: eks.Cluster) {
		// Setup AWS EBS CSI Driver
		new eks.CfnAddon(this, 'EbsCsiDriver', {
			addonName: 'aws-ebs-csi-driver',
			clusterName: cluster.clusterName,
		});

		// Setup VPC CNI Plugin
		new eks.CfnAddon(this, 'VpcCni', {
			addonName: 'vpc-cni',
			clusterName: cluster.clusterName,
			resolveConflicts: 'OVERWRITE',
		});

		// Setup AWS EFS CSI Driver for ReadWriteMany support
		new eks.CfnAddon(this, 'EfsCsiDriver', {
			addonName: 'aws-efs-csi-driver',
			clusterName: cluster.clusterName,
		});
	}

	private createIngress(cluster: eks.Cluster, dependsOn: IDependable[]) {
		const ingressConfig = {
			apiVersion: 'networking.k8s.io/v1',
			kind: 'Ingress',
			metadata: {
				name: 'flow-ingress',
				namespace: 'flow',
				annotations: {
					'kubernetes.io/ingress.class': 'alb',
					'alb.ingress.kubernetes.io/scheme': 'internet-facing',
					'alb.ingress.kubernetes.io/target-type': 'ip',
					'alb.ingress.kubernetes.io/listen-ports': '[{"HTTP": 80}, {"HTTPS": 443}]',
				},
			},
			spec: {
				rules: [
					{
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						host: formDomain(process.env.ENVIRONMENT_NAME!),
						http: {
							paths: [
								{
									path: '/',
									pathType: 'Prefix',
									backend: {
										service: {
											name: 'n8n',
											port: {
												number: 80,
											},
										},
									},
								},
							],
						},
					},
				],
			},
		};
		const manifest = cluster.addManifest('n8nIngress', ingressConfig);
		manifest.node.addDependency(dependsOn);
		return manifest;
	}

	private createRoute53RecordForIngress(cluster: eks.Cluster, dependsOn: IDependable[]) {
		const ingressAddress = cluster.getIngressLoadBalancerAddress('flow-ingress', { namespace: 'flow' });
		const zone = cdk.aws_route53.HostedZone.fromLookup(this, 'Zone', {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			domainName: process.env.ROOT_APP_DOMAIN!,
		});

		// Add the DNS record for the ingress if it's not already present
		new cdk.aws_route53.ARecord(this, 'ARecord', {
			zone,
			recordName: process.env.ROOT_APP_DOMAIN,
			target: cdk.aws_route53.RecordTarget.fromIpAddresses(ingressAddress),
		}).node.addDependency(dependsOn);
	}
}

const STAGE_TO_DOMAIN_PREFIX = {
	production: '',
	staging: 'stg.',
	development: 'dev.',
};

const formDomain = (stage: string) => {
	const appSubdomain = 'flow';
	const envSubdomain = STAGE_TO_DOMAIN_PREFIX[(stage as keyof typeof STAGE_TO_DOMAIN_PREFIX) || 'staging'];

	const finalDomain = `${appSubdomain}${envSubdomain}${process.env.ROOT_APP_DOMAIN}`;

	return finalDomain;
};
