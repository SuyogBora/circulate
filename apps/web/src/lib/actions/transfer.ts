"use server"

import { GetSignedURLParams, SignedUrlResponse } from "@/types/actions";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../aws/s3";

const maxFileSize = 1048576 * 200;

export async function getUploadSignedURL({
    fileType,
    fileSize,
    fileKey
}: GetSignedURLParams): Promise<SignedUrlResponse> {
    try {
        if (fileSize > maxFileSize) {
            return {
                success: false,
                error: "File size exceeds the maximum limit of 200 MB.",
            };
        }
        const putObjectCommand = new PutObjectCommand({
            Bucket:'circulate-dev-env',
            Key:fileKey,
            ContentType:fileType,
        });
        const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });
        return {
            success: true,
            data: {
                url
            },
        };
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "An unexpected error occurred.";
        return {
            success: false,
            error: errorMessage,
        };
    }
}

export async function addTransferLog(){

}
