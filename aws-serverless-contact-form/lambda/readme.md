## cd aws-serverless-contact-form/lambda

## Create Role:

aws iam create-role \
  --role-name LambdaContactRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }]
  }'

## Attach polices:

  aws iam attach-role-policy \
  --role-name LambdaContactRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

aws iam attach-role-policy \
  --role-name LambdaContactRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess

 ## Create and attach custom policy for SES access

  aws iam put-role-policy \
  --role-name LambdaContactRole \
  --policy-name SESAccessPolicy \
  --policy-document file://ses-policy.json

## Get ARN:

  aws iam get-role --role-name LambdaContactRole

## Create the Lambda function:

  aws lambda create-function \
  --function-name ContactFormHandler \
  --runtime nodejs18.x \
  --handler handler.js \
  --role arn:aws:iam::537824366233:role/LambdaContactRole \
  --zip-file fileb://function.zip

## Test the function

aws lambda invoke \
  --function-name ContactFormHandler \
  --payload '{"body": "{\"name\":\"John\",\"email\":\"john@example.com\",\"message\":\"Hello!\"}"}' \
  response.json

  