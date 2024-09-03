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
cd apps/infra
npx cdk bootstrap
```

4. Setup N8N configuration in the `apps/infra/lib/flow-stack.ts` file
TypeScript type inference will help you to understand the configuration structure. The types are defined in the `apps/infra/types/n8n.ts` file.

5. Deploy the stack
```bash
cd apps/infra
npx cdk deploy
```