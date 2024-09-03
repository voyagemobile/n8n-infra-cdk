export interface N8nConfigValues {
	/**
	 * if not specified n8n on first launch creates a random encryption key for encrypting saved credentials and saves it in the ~/.n8n folder
	 */
	n8n: {
		encryption_key?: string;
		defaults?: any;
	};
	config?: {
		executions?: {
			/**
			 * prune executions by default
			 */
			pruneData?: string;
			/**
			 * Per default we store 1 year of history
			 */
			pruneDataMaxAge?: number;
		};
	};
	/**
	 * Use an existing Kubernetes secret, e.g created by hand or Vault operator.
	 */
	existingSecret?: string;
	/**
	 * Dict with all n8n json config options, unlike config the values here will end up in a secret.
	 */
	secret?: {
		database?: {
			postgresdb?: {
				password?: string;
			};
		};
	};
	database?: {
		/**
		 * Type of database to use - Other possible types ['sqlite', 'mariadb', 'mysqldb', 'postgresdb'] - default: sqlite
		 */
		type?: string;
		/**
		 * Prefix for table names - default: ''
		 */
		tablePrefix?: string;
		postgresdb?: {
			/**
			 * PostgresDB Database - default: n8n
			 */
			database?: string;
			/**
			 * PostgresDB Host - default: localhost
			 */
			host?: string;
			/**
			 * PostgresDB Password - default: ''
			 */
			password?: string;
			/**
			 * PostgresDB Port - default: 5432
			 */
			port?: number;
			/**
			 * PostgresDB User - default: root
			 */
			user?: string;
			/**
			 * PostgresDB Schema - default: public
			 */
			schema?: string;
			ssl?: {
				/**
				 * SSL certificate authority - default: ''
				 */
				ca?: string;
				/**
				 * SSL certificate - default: ''
				 */
				cert?: string;
				/**
				 * SSL key - default: ''
				 */
				key?: string;
				/**
				 * If unauthorized SSL connections should be rejected - default: true
				 */
				rejectUnauthorized?: boolean;
			};
		};
		mysqldb?: {
			/**
			 * MySQL Database - default: n8n
			 */
			database?: string;
			/**
			 * MySQL Host - default: localhost
			 */
			host?: string;
			/**
			 * MySQL Password - default: ''
			 */
			password?: string;
			/**
			 * MySQL Port - default: 3306
			 */
			port?: number;
			/**
			 * MySQL User - default: root
			 */
			user?: string;
		};
	};
	credentials?: {
		overwrite?: {
			/**
			 * Overwrites for credentials - default: "{}"
			 */
			data?: string;
			/**
			 * Fetch credentials from API - default: ''
			 */
			endpoint?: string;
		};
	};
	executions?: {
		/**
		 * In what process workflows should be executed - possible values [main, own] - default: own
		 */
		process?: string;
		/**
		 * Max run time (seconds) before stopping the workflow execution - default: -1
		 */
		timeout?: number;
		/**
		 * Max execution time (seconds) that can be set for a workflow individually - default: 3600
		 */
		maxTimeout?: number;
		/**
		 * What workflow execution data to save on error - possible values [all , none] - default: all
		 */
		saveDataOnError?: string;
		/**
		 * What workflow execution data to save on success - possible values [all , none] - default: all
		 */
		saveDataOnSuccess?: string;
		/**
		 * Save data of executions when started manually via editor - default: false
		 */
		saveDataManualExecutions?: boolean;
		/**
		 * Delete data of past executions on a rolling basis - default: false
		 */
		pruneData?: boolean;
		/**
		 * How old (hours) the execution data has to be to get deleted - default: 336
		 */
		pruneDataMaxAge?: number;
		/**
		 * Timeout (seconds) after execution data has been pruned - default: 3600
		 */
		pruneDataTimeout?: number;
	};
	generic?: {
		/**
		 * The timezone to use - default: America/New_York
		 */
		timezone?: string;
	};
	/**
	 * Path n8n is deployed to - default: "/"
	 */
	path?: string;
	/**
	 * Host name n8n can be reached - default: localhost
	 */
	host?: string;
	/**
	 * HTTP port n8n can be reached - default: 5678
	 */
	port?: number;
	/**
	 * IP address n8n should listen on - default: 0.0.0.0
	 */
	listen_address?: string;
	/**
	 * HTTP Protocol via which n8n can be reached - possible values [http , https] - default: http
	 */
	protocol?: string;
	/**
	 * SSL Key for HTTPS Protocol - default: ''
	 */
	ssl_key?: string;
	/**
	 * SSL Cert for HTTPS Protocol - default: ''
	 */
	ssl_cert?: string;
	security?: {
		/**
		 * Additional endpoints to exclude auth checks. Multiple endpoints can be separated by colon - default: ''
		 */
		excludeEndpoints?: string;
		basicAuth?: {
			/**
			 * If basic auth should be activated for editor and REST-API - default: false
			 */
			active?: boolean;
			/**
			 * The name of the basic auth user - default: ''
			 */
			user?: string;
			/**
			 * The password of the basic auth user - default: ''
			 */
			password?: string;
			/**
			 * If password for basic auth is hashed - default: false
			 */
			hash?: boolean;
		};
		jwtAuth?: {
			/**
			 * If JWT auth should be activated for editor and REST-API - default: false
			 */
			active?: boolean;
			/**
			 * The request header containing a signed JWT - default: ''
			 */
			jwtHeader?: string;
			/**
			 * The request header value prefix to strip (optional) default: ''
			 */
			jwtHeaderValuePrefix?: string;
			/**
			 * The URI to fetch JWK Set for JWT authentication - default: ''
			 */
			jwksUri?: string;
			/**
			 * JWT issuer to expect (optional) - default: ''
			 */
			jwtIssuer?: string;
			/**
			 * JWT namespace to expect (optional) -  default: ''
			 */
			jwtNamespace?: string;
			/**
			 * JWT tenant key name to inspect within JWT namespace (optional) - default: ''
			 */
			jwtAllowedTenantKey?: string;
			/**
			 * JWT tenant to allow (optional) - default: ''
			 */
			jwtAllowedTenant?: string;
		};
	};
	endpoints?: {
		/**
		 * Path for rest endpoint  default: rest
		 */
		rest?: string;
		/**
		 * Path for webhook endpoint  default: webhook
		 */
		webhook?: string;
		/**
		 * Path for test-webhook endpoint  default: webhook-test
		 */
		webhookTest?: string;
		/**
		 * Path for waiting-webhook endpoint  default: webhook-waiting
		 */
		webhookWaiting?: string;
	};
	/**
	 * Files containing external hooks. Multiple files can be separated by colon - default: ''
	 */
	externalHookFiles?: string;
	nodes?: {
		/**
		 * Nodes not to load - default: "[]"
		 */
		exclude?: string;
		/**
		 * Node Type to use as Error Trigger - default: n8n-nodes-base.errorTrigger
		 */
		errorTriggerType?: string;
	};
	/**
	 * Set additional environment variables on the Deployment
	 */
	extraEnv?: Record<string, any>;
	/**
	 * Set additional environment from existing secrets
	 */
	extraEnvSecrets?: Record<string, any>;
	persistence?: {
		/**
		 * If true, use a Persistent Volume Claim, If false, use emptyDir
		 */
		enabled?: boolean;
		/**
		 * what type volume, possible options are [existing, emptyDir, dynamic] dynamic for Dynamic Volume Provisioning, existing for using an existing Claim
		 */
		type?: string;
		/**
		 * Persistent Volume Access Mode
		 */
		accessModes?: string[];
		/**
		 * Persistent Volume size
		 */
		size?: string;
		/**
		 * Use an existing PVC
		 */
		existingClaim?: string;
	};
	/**
	 * Number of replicas
	 */
	replicaCount?: number;
	/**
	 * Deployment strategy
	 */
	deploymentStrategy?: {
		type?: string;
		maxSurge?: string;
		maxUnavailable?: string;
	};
	image?: {
		/**
		 * Repository of the image
		 */
		repository?: string;
		/**
		 * Image pull policy
		 */
		pullPolicy?: string;
		/**
		 * Overrides the image tag whose default is the chart appVersion.
		 */
		tag?: string;
	};
	imagePullSecrets?: any[];
	/**
	 * Name override
	 */
	nameOverride?: string;
	/**
	 * Full name override
	 */
	fullnameOverride?: string;
	serviceAccount?: {
		/**
		 * Specifies whether a service account should be created
		 */
		create?: boolean;
		/**
		 * Annotations to add to the service account
		 */
		annotations?: Record<string, any>;
		/**
		 * The name of the service account to use. If not set and create is true, a name is generated using the fullname template
		 */
		name?: string;
	};
	/**
	 * Annotations to add to the pods
	 */
	podAnnotations?: Record<string, any>;
	/**
	 * Additional labels to add to the pods
	 */
	podLabels?: Record<string, any>;
	podSecurityContext?: {
		runAsNonRoot?: boolean;
		runAsUser?: number;
		runAsGroup?: number;
		fsGroup?: number;
	};
	securityContext?: Record<string, any>;
	lifecycle?: Record<string, any>;
	/**
	 * Command to override the default one
	 */
	command?: string[];
	livenessProbe?: {
		httpGet?: {
			path?: string;
			port?: string;
		};
		initialDelaySeconds?: number;
		periodSeconds?: number;
		timeoutSeconds?: number;
		failureThreshold?: number;
		successThreshold?: number;
	};
	readinessProbe?: {
		httpGet?: {
			path?: string;
			port?: string;
		};
		initialDelaySeconds?: number;
		periodSeconds?: number;
		timeoutSeconds?: number;
		failureThreshold?: number;
		successThreshold?: number;
	};
	initContainers?: any[];
	service?: {
		/**
		 * type of service
		 */
		type?: string;
		/**
		 * port of service
		 */
		port?: number;
		/**
		 * Annotations to add to the service
		 */
		annotations?: Record<string, any>;
	};
	ingress?: {
		/**
		 * If Ingress is enabled
		 */
		enabled?: boolean;
		/**
		 * Annotations to add to the ingress
		 */
		annotations?: Record<string, any>;
		/**
		 * Hosts for the ingress
		 */
		hosts?: {
			host?: string;
			paths?: string[];
		}[];
		/**
		 * TLS configuration for the ingress
		 */
		tls?: {
			secretName?: string;
			hosts?: string[];
		}[];
		className?: string;
	};
	workerResources?: Record<string, any>;
	webhookResources?: Record<string, any>;
	resources?: Record<string, any>;
	autoscaling?: {
		/**
		 * If autoscaling is enabled
		 */
		enabled?: boolean;
		/**
		 * Min replicas for autoscaling
		 */
		minReplicas?: number;
		/**
		 * Max replicas for autoscaling
		 */
		maxReplicas?: number;
		/**
		 * Target CPU utilization for autoscaling
		 */
		targetCPUUtilizationPercentage?: number;
		/**
		 * Target memory utilization for autoscaling
		 */
		targetMemoryUtilizationPercentage?: number;
	};
	nodeSelector?: Record<string, any>;
	tolerations?: any[];
	affinity?: Record<string, any>;
	scaling?: {
		/**
		 * If scaling is enabled
		 */
		enabled?: boolean;
		worker?: {
			/**
			 * Number of worker nodes
			 */
			count?: number;
			/**
			 * Concurrency for worker nodes
			 */
			concurrency?: number;
		};
		webhook?: {
			/**
			 * If webhook scaling is enabled
			 */
			enabled?: boolean;
			/**
			 * Number of webhook nodes
			 */
			count?: number;
		};
		redis?: {
			/**
			 * Redis host
			 */
			host?: string;
			/**
			 * Redis password
			 */
			password?: string;
		};
	};
	redis?: {
		/**
		 * If redis is enabled
		 */
		enabled?: boolean;
		/**
		 * Redis architecture
		 */
		architecture?: string;
		master?: {
			persistence?: {
				/**
				 * If persistence is enabled
				 */
				enabled?: boolean;
				/**
				 * Existing claim for persistence
				 */
				existingClaim?: string;
				/**
				 * Size of persistence
				 */
				size?: string;
			};
		};
	};
}
