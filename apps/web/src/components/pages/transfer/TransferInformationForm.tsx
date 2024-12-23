"use client";

import { TransferCreateSchema } from "@/lib/validation/transfer";
import { TransferMode } from "@/types/enums";
import { TransferCreateDataType } from "@/types/state";
import {
    Button,
    DialogFooter,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    RadioGroup,
    RadioGroupItem,
    Switch,
    Textarea
} from "@circulate/ui";
import { cn } from "@circulate/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TransferInformationFormProps {
    files: File[] | []
    transferMode: TransferMode,
    handleSubmit: (data: z.infer<typeof TransferCreateSchema>) => void,
    handleClose: () => void,
    isActiveStep:boolean,
    initailsTransferData:TransferCreateDataType,
}

const TransferInformationForm: FC<TransferInformationFormProps> = ({ files, transferMode, handleSubmit,isActiveStep,initailsTransferData,handleClose }) => {
    const form = useForm<z.infer<typeof TransferCreateSchema>>({
        resolver: zodResolver(TransferCreateSchema),
        values: {
            ...initailsTransferData,
            transferName:files[0]?.name ?? "",
            transferMode:transferMode
        }
    });
    const watchTransferMode = form.watch("transferMode");
    const watchPasswordEnabled = form.watch("fileIsPasswordEnabled");
    return (
        <div className={cn("",{
             "hidden":!isActiveStep
        })}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="transferName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Transfer Name</FormLabel>
                                <FormControl>
                                    <Input className="text-xs" placeholder="Enter transfer name" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transferMessage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Transfer Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="text-xs"
                                        placeholder="Add an optional message"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fileIsPasswordEnabled"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-sm">Enable Password</FormLabel>
                                    <Switch size="small" checked={field.value} onCheckedChange={field.onChange} />
                                </div>
                            </FormItem>
                        )}
                    />
                    {watchPasswordEnabled && (
                        <FormField
                            control={form.control}
                            name="filePassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="text-xs" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="transferMode"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Select Transfer Mode</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-8 flex-row py-3 px-4 bg-muted rounded-md"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="manual_send" />
                                            </FormControl>
                                            <FormLabel>Get Transfer Link</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="email_send" />
                                            </FormControl>
                                            <FormLabel>Send Link via Email</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {watchTransferMode === "email_send" && (
                        <FormField
                            control={form.control}
                            name="recipientEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Recipient Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-xs"
                                            placeholder="Enter recipient email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    )}
                    <DialogFooter className="grid grid-cols-2 gap-2">
                        <Button type="button" variant={"destructive"} className="w-full" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" className="w-full">Save and Continue</Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    )
}

export default TransferInformationForm