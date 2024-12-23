export type GetSignedURLParams = {
    fileType: string;
    fileSize: number;
    fileKey: string;
};

export type SignedUrlResponse =
    | {
        success: true;
        data: {
            url: string;
        };
    }
    | {
        success: false;
        error: string;
    };