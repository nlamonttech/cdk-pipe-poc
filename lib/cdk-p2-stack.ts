import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import appConfig from '../config/app-config.json';
import { Repository } from 'aws-cdk-lib/aws-codecommit'
import { MyLambdaStack } from './my-pipeline-lambda-stack';
import { MyPipelineAppStage } from './my-pipeline-app-stage';


export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new cdk.App();
    
    const repository = Repository.fromRepositoryName(this, 'Repository', appConfig.Project.Repo);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.codeCommit(repository, 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
   
    pipeline.addStage(new MyPipelineAppStage(this, "test"));
  }
}

