"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { signIn } from "@/lib/auth/auth-client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInSchema } from "@/lib/validations/auth"



type SignInFormValues = z.infer<typeof signInSchema>

const SignInCard = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormValues) => {
    setServerError("")
    const result = await signIn.email({
      email: data.email,
      password: data.password,
    })
    if (result.error) {
      setServerError(result.error.message ?? "Failed to sign in")
      return
    }
    router.push("/dashboard")
  }
  return (
    <Card className="w-full max-w-md border-gray-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-secondary-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="carl@yahoo.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-secondary-foreground">
            Don’t have an account?
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              {" "}Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignInCard