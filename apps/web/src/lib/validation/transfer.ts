import { TransferMode } from "@/types/enums";
import { z } from "zod";

export const TransferSchema = z
  .object({
    transferName: z.string().min(1, {
      message: "Transfer name is required.",
    }),
    transferKey: z.string().min(1, {
      message: "Transfer key is required",
    }),
    transferMessage: z.string().optional(),
    filePassword: z.string().optional(),
    transferMode: z.enum([TransferMode.EMAIL_SEND, TransferMode.MANUAL_SEND], {
      required_error: "You need to select a transfer mode.",
    }),
    fileSize: z.number().positive({
      message: "File size must be a positive number.",
    }),
    fileType: z.string().min(1, {
      message: "File type is required.",
    }),
    fileIsPasswordEnabled: z.boolean().default(false),
    recipientEmail: z.string().email({
      message: "Invalid email address.",
    }).optional(),
    expirationDate: z.date().optional(),
    downloadCount: z.number().int().nonnegative({
      message: "Download count must be a non-negative integer.",
    }).default(0).optional(),
    maxDownloads: z.number().int().positive({
      message: "Max downloads must be a positive integer.",
    }).optional(),
    userId: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.fileIsPasswordEnabled && (!data.filePassword || data.filePassword.length < 6)) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 6 characters long when enabled.",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.transferMode === "EMAIL_SEND") {
      if (!data.recipientEmail) {
        ctx.addIssue({
          path: ["recipientEmail"],
          message: "Recipient email is required when sending via email.",
          code: z.ZodIssueCode.custom,
        });
      } else if (!z.string().email().safeParse(data.recipientEmail).success) {
        ctx.addIssue({
          path: ["recipientEmail"],
          message: "Invalid email address.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const TransferCreateSchema = z.object({
  transferName: z.string().min(1, {
    message: "Transfer name is required.",
  }),
  transferMessage: z.string().optional(),
  filePassword: z.string().optional(),
  transferMode: z.enum([TransferMode.MANUAL_SEND, TransferMode.EMAIL_SEND], {
    required_error: "You need to select a transfer mode.",
  }),
  recipientEmail: z.string().optional(),
  fileIsPasswordEnabled: z.boolean().default(false),
});
