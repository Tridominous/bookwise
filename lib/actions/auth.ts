"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">,
  ) => {
    const { email, password } = params;
  
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
  
    if (!success) return redirect("/too-fast");
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        return { success: false, error: result.error };
      }
  
      return { success: true };
    } catch (error) {
      console.log(error, "Signin error");
      return { success: false, error: "Signin error" };
    }
  };
  
  export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params;

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) return redirect("/too-fast");

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return {success: false, error: "User already exists"};
    }

    const hashedPassword = await hash(password, 10);

    try {
        // First create the user
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
            universityId,
            universityCard,
        });

        // Try to sign in the user regardless of workflow success
        let signInResult;
        try {
            signInResult = await signInWithCredentials({email, password});
        } catch (signInError) {
            console.log(signInError, "SignIn error after user creation");
            return {success: false, error: "Account created but unable to sign in"};
        }

        // Try the workflow trigger with environment check
        try {
            if (process.env.NODE_ENV === 'production') {
                await workflowClient.trigger({
                    url: `${config.env.prodAPiEndpoint}/api/workflow/onboarding`,
                    body: {
                        email,
                        fullName,
                    },
                });
            } else {
                console.log('Dev mode: Skipping onboarding workflow for:', { email, fullName });
            }
        } catch (workflowError) {
            console.log(workflowError, "Workflow trigger error");
            // Don't fail the entire signup process just because the workflow failed
            return signInResult.success 
                ? {success: true, warning: "Account created but welcome email may be delayed"} 
                : {success: false, error: "Account created but couldn't sign you in"};
        }

        return {success: true};
    } catch (error) {
        console.log(error, "SignUp error");
        return {success: false, error: "Error signing up"};
    }
}