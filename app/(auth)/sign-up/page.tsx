"use client";
import AuthForm from "@/components/AuthForm"
import { signUpSchema } from "@/lib/validations"


const Page = () => {
  return (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{ 
          fullName: '',
          email: '', 
          password: '',
          universityId: 0,
          universityCard: "", 
        }}
        onSubmit={async (data) => {
          return { success: true };
        }}
    />
  )
}

export default Page