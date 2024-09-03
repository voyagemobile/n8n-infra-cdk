# n8n-infra-cdk
This is a CDK project to deploy n8n infrastructure on AWS.

## Prerequisites
- AWS CLI
- AWS CDK
- Node.js

## How to deploy
1. Clone this repository
2. Install dependencies
```bash
npm install
```
3. Bootstrap CDK
```bash
npx cdk bootstrap
```

4. Setup N8N configuration in the `lib/workflow-stack.ts` file

4. Deploy the stack
```bash
npx cdk deploy
```