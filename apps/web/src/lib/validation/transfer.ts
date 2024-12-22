import { TransferMode } from "@/types/enums";
import { z } from "zod";

export const TransferInfoFormSchema = z
  .object({
    transferName: z.string().min(1, {
      message: "Transfer name is required.",
    }),
    transferMessage: z.string().optional(),
    password: z.string().optional(),
    transferMode: z.enum([TransferMode.EMAIL_SEND,TransferMode.MANUAL_SEND,], {
      required_error: "You need to select a transfer mode.",
    }),
    recipientEmail: z.string().optional(),
    isPasswordEnabled: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.isPasswordEnabled && (!data.password || data.password.length < 6)) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 6 characters long when enabled.",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.transferMode === "email_send") {
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
