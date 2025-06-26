// lambda/handler.js
const AWS = require('aws-sdk');
const ses = new AWS.SES();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const { name, email, message } = data;

  // Store in DynamoDB
  await dynamodb.put({
    TableName: 'ContactMessages',
    Item: { id: Date.now().toString(), name, email, message }
  }).promise();

  // Send email using SES
  await ses.sendEmail({
    Source: "hussam.maaly@gmail.com",
    Destination: { ToAddresses: ["hussam.maaly@gmail.com"] },
    Message: {
      Subject: { Data: `New Contact from ${name}` },
      Body: { Text: { Data: `Message: ${message}\nFrom: ${email}` } }
    }
  }).promise();

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
