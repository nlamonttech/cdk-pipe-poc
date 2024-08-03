#!/usr/bin/env node
//import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyPipelineStack } from '../lib/cdk-p2-stack';
import appConfig from '../config/app-config.json';


const app = new cdk.App();
const stackPrefix =  `${appConfig.Project.Name}${appConfig.Project.Stage}`
const stackProps: cdk.StackProps = {
    env: {
        account: appConfig.Project.Account,
        region: appConfig.Project.Region
    }
};

new MyPipelineStack(app, 'MyPipelineStack', {
    env: {
        account: appConfig.Project.Account,
        region: appConfig.Project.Region
    }
  });


app.synth();
  