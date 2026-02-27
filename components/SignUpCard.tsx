"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { signUp } from "@/lib/auth/auth-client"

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
import { signUpSchema } from "@/lib/validations/auth"

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpCard = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = async (data: SignUpFormValues) => {
    setServerError("")
    const result = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    if (result.error) {
      setServerError(result.error.message ?? "Failed to sign up")
      return
    }
    router.push("/dashboard")
  }
  return (
    <Card className="w-full max-w-md border-gray-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Enter your details to create an account
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-center text-sm text-secondary-foreground">
            Already have an account?
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              {" "}Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignUpCard