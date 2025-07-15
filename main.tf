terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
resource "aws_s3_bucket" "example" {
  bucket = "hussameldein-bucket8573625"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
