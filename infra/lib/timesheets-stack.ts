import {
  Stack,
  StackProps,
  aws_apigateway as apigw,
  aws_lambda as lambda,
  aws_certificatemanager as acm,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class TimesheetsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, "HelloFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "handler.handler",
      code: lambda.Code.fromAsset("../backend/timesheets/dist/hello"),
    });

    const apiCertificate = new acm.Certificate(
      this,
      "SchedulerLiteApiCertificate",
      {
        domainName: "api.schedulerlite.take2tech.ca",
        validation: acm.CertificateValidation.fromDns(),
      },
    );

    new apigw.LambdaRestApi(this, "TimesheetsApi", {
      handler: helloFunction,
      proxy: true,
      domainName: {
        domainName: "api.schedulerlite.take2tech.ca",
        certificate: apiCertificate,
      },
    });
  }
}
