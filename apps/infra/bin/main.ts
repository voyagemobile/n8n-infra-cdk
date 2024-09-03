#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { FlowStack } from "../lib/flow-stack";

const app = new cdk.App();

if (["production", "staging"].includes(process.env.ENVIRONMENT_NAME!))
  new FlowStack(app, "WorkflowStack", {
    tags: {
      application: "flow",
      type: "kubernetes",
      environment: "staging",
    },
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
