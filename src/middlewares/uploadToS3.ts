require("dotenv").config();
import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const s3 = new S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: 'us-east-1' ,
});

export const uploadFile = async (file: any, folder: any, nameUnic: any, contentType: any) => {

  const fileStream = fs.createReadStream(file);

  const uploadParams: any = {
    Bucket : 'ez-marketing-bucket',
    Body   : fileStream,
    Key    : nameUnic,
    ContentType: contentType,
    ACL    : "public-read-write",   
  };

  return s3.upload(uploadParams).promise(); // this will upload file to S3

}
