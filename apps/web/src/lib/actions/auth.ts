'use server'

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(redirectUrl:string,formData: FormData) {
    const action = formData.get('action')?.toString();
    await signIn(action,{redirectTo:redirectUrl});
}

export async function doLogout() {
    await signOut({ redirectTo: "/auth/login" });
}
