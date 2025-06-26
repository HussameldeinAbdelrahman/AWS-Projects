## Create the S3 Bucket
BUCKET_NAME="twomia.com"  # Replace with your domain
aws s3api create-bucket --bucket $BUCKET_NAME --region us-east-1

## Enable Static Website Hosting
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document error.html

## Upload Website Files
echo '<h1>Welcome to My Website!</h1>' > index.html

## Upload it to S3
aws s3 cp index.html s3://$BUCKET_NAME/

## Set Bucket Policy

cat > policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket twomia.com --policy file://policy.json

## Verify Website URL
http://twomia.com.s3-website-us-east-1.amazonaws.com

## Create a Hosted Zone
DOMAIN_NAME="twomia.com"  # Replace with your domain
aws route53 create-hosted-zone --name $DOMAIN_NAME --caller-reference $(date +%s)
## Note the HostedZoneId from the output (e.g., Z123456789ABC).
/hostedzone/Z00771342P0B4WLGQ0GTV

## Get the S3 Website Endpoint
S3_ENDPOINT="$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"

## Create an Alias Record
cat > alias-record.json <<EOF
{
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "$DOMAIN_NAME",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z00771342P0B4WLGQ0GTV",  # Fixed S3 Hosted Zone ID for us-east-1
                    "DNSName": "s3-website-us-east-1.amazonaws.com",
                    "EvaluateTargetHealth": false
                }
            }
        }
    ]
}
EOF

## Apply the DNS Record
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='$DOMAIN_NAME.'].Id" --output text | cut -d'/' -f3)
aws route53 change-resource-record-sets --hosted-zone-id Z00771342P0B4WLGQ0GTV --change-batch file://alias-record.json

## Verify Your Website
Open your browser and visit:
http://example.com (main site)
http://www.example.com (redirects to main site)


aws ec2-instance-connect send-ssh-public-key \
    --instance-id i-01ab28dcc2bf61de7 \
    --instance-os-user ec2-user \
    --availability-zone us-east-1 \
    --ssh
 

ssh -i "EC2_Key pair.pem" ec2-user@10.0.133.204