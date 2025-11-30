import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
  aws_apigateway as apigw,
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_lambda as lambda,
  aws_s3 as s3,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class TimesheetsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handlerFunction = new lambda.Function(this, "HandlerFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "handler.handler",
      code: lambda.Code.fromAsset("../apps/backend/timesheets/dist"),
    });

    const apiCertificate = new acm.Certificate(
      this,
      "SchedulerLiteApiCertificate",
      {
        domainName: "api.schedulerlite.take2tech.ca",
        validation: acm.CertificateValidation.fromDns(),
      },
    );

    const appCertificate = new acm.Certificate(
      this,
      "SchedulerLiteAppCertificate",
      {
        domainName: "app.schedulerlite.take2tech.ca",
        validation: acm.CertificateValidation.fromDns(),
      },
    );

    const api = new apigw.RestApi(this, "TimesheetsApi", {
      restApiName: "TimesheetsApi",
      domainName: {
        domainName: "api.schedulerlite.take2tech.ca",
        certificate: apiCertificate,
      },
      deployOptions: {
        stageName: "prod",
      },
    });

    api.root.addProxy({
      anyMethod: true,
      defaultIntegration: new apigw.LambdaIntegration(handlerFunction),
    });

    const frontendBucket = new s3.Bucket(this, "SchedulerLiteFrontendBucket", {
      websiteIndexDocument: "index.html",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const frontendDistribution = new cloudfront.Distribution(
      this,
      "SchedulerLiteFrontendDistribution",
      {
        certificate: appCertificate,
        defaultBehavior: {
          origin:
            origins.S3BucketOrigin.withOriginAccessControl(frontendBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        domainNames: ["app.schedulerlite.take2tech.ca"],
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: Duration.seconds(0),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: Duration.seconds(0),
          },
        ],
      },
    );

    new CfnOutput(this, "FrontendDistributionDomainName", {
      value: frontendDistribution.distributionDomainName,
    });
  }
}
