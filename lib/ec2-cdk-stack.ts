import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as ssm from '@aws-cdk/aws-ssm';


export class Ec2CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    const ssm_role = new iam.Role(this, 'SSM Role', {
       assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
       managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2RoleforSSM')],
       roleName: 'SSMEC2Role'
    });
    
    const image_id = new cdk.CfnParameter(this, 'Image id', {
      // default: ec2.MachineImage.fromSSMParameter('/bsh/ec2/ami/new', ec2.OperatingSystemType.LINUX)
      default: ssm.StringParameter.valueForStringParameter(this, '/bsh/ec2/ami/new')
    });
    
    console.log (image_id);
    const vpc = ec2.Vpc.fromLookup(this, 'Default VPC', {isDefault: true});
    const image = ec2.MachineImage.lookup({name: image_id.valueAsString});
    const test_ec2 = new ec2.Instance(this, "Test Subject", {
       instanceName: 'Test Subject',
       instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
       vpc: vpc,
       machineImage: image,
       role: ssm_role,
       securityGroup: ec2.SecurityGroup.fromLookup(this, 'JindalSG', 'sg-0ae441b42159a7d45'),
       keyName: 'jindal-test'
    });
  }
}



