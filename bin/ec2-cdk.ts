#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { Ec2CdkStack } from '../lib/ec2-cdk-stack';
const envEU  = { account: '267456790171', region: 'eu-central-1' };

const app = new cdk.App();
new Ec2CdkStack(app, 'Ec2CdkStack', {env: envEU});

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}