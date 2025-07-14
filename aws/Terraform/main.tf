provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "myBucket-5544662211"
  acl    = "private"

  tags = {
    Environment = "Dev"
  }
}