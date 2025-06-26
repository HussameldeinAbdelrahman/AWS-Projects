Create the API:

aws apigatewayv2 create-api \
  --name ContactFormAPI \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:537824366233:function:ContactFormHandler

  APIID:uqra68efz9

  Grant API Gateway Permission to Invoke Your Lambda:

  aws lambda add-permission \
  --function-name ContactFormHandler \
  --statement-id apigateway-permission \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn arn:aws:execute-api:us-east-1:537824366233:uqra68efz9/*/*/*

  Deploy the API:

  aws apigatewayv2 create-stage \
  --api-id uqra68efz9 \
  --stage-name prod \
  --auto-deploy

  Endpoint URL:https://uqra68efz9.execute-api.us-east-1.amazonaws.com/prod/contact
  
  Test:
  curl -X POST https://uqra68efz9.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "message": "Hi!"}'




