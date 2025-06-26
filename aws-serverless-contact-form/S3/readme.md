Create Bucket:

aws s3api create-bucket \
  --bucket my-contact-form-bucket-2025 \
  --region us-east-1

Enable Website Hosting:

  aws s3 website s3://my-contact-form-bucket-2025/ \
  --index-document index.html

  Upload Files to the Bucket:

  aws s3 cp index.html s3://my-contact-form-bucket-2025/

  Disable Block Public Access on the Bucket:

  aws s3api put-public-access-block \
  --bucket my-contact-form-bucket-2025 \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false


  Set the Bucket Policy to Allow Public Read Access:

  aws s3api put-bucket-policy \
  --bucket my-contact-form-bucket-2025 \
  --policy file://bucket-policy.json

