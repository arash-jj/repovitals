import { signUpSchema, signInSchema } from "@/lib/validations/auth"

describe("SignUp Validation", () => {
  const validUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    confirmPassword: "password123",
  }
  test("valid user passes validation", () => {
    const result = signUpSchema.safeParse(validUser)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validUser)
    }
  })
  test("name must be at least 2 characters", () => {
    const result = signUpSchema.safeParse({
      ...validUser,
      name: "J",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const nameError = result.error.issues.find((issue) => issue.path[0] === "name")
      expect(nameError).toBeDefined()
      expect(nameError?.message).toBe("Name must be at least 2 characters")
    }
  })
  test("email must be valid", () => {
    const result = signUpSchema.safeParse({
      ...validUser,
      email: "invalid-email",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path[0] === "email")
      expect(emailError).toBeDefined()
      expect(emailError?.message).toBe("Invalid email address")
    }
  })
  test("password must be at least 8 characters", () => {
    const result = signUpSchema.safeParse({
      ...validUser,
      password: "1234567",
      confirmPassword: "1234567",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const passwordError = result.error.issues.find((issue) => issue.path[0] === "password")
      expect(passwordError).toBeDefined()
      expect(passwordError?.message).toBe("Password must be at least 8 characters")
    }
  })
  test("passwords must match", () => {
    const result = signUpSchema.safeParse({
      ...validUser,
      password: "password123",
      confirmPassword: "different",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const confirmError = result.error.issues.find((issue) => issue.path[0] === "confirmPassword")
      expect(confirmError).toBeDefined()
      expect(confirmError?.message).toBe("Passwords do not match")
    }
  })
})

describe("SignIn Validation", () => {
  const validCredentials = {
    email: "john@example.com",
    password: "password123",
  }

  test("valid credentials pass", () => {
    const result = signInSchema.safeParse(validCredentials)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validCredentials)
    }
  })

  test("invalid email fails", () => {
    const result = signInSchema.safeParse({
      email: "invalid",
      password: "password123",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path[0] === "email")
      expect(emailError).toBeDefined()
      expect(emailError?.message).toBe("Invalid email address")
    }
  })

  test("short password fails", () => {
    const result = signInSchema.safeParse({
      email: "john@example.com",
      password: "1234567",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const passwordError = result.error.issues.find((issue) => issue.path[0] === "password")
      expect(passwordError).toBeDefined()
      expect(passwordError?.message).toBe("Password must be at least 8 characters")
    }
  })
})
