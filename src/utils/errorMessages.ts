export type ErrorMessages = Partial<Record<string, string>> & { FALLBACK: string }

const FALLBACK = "Oops, something went wrong!"

const auth: ErrorMessages = {
  UNAUTHORIZED: "Invalid email or password.",
  VALIDATION_ERROR: "Please check the entered data.",
  FALLBACK
}

const link: ErrorMessages = {
  VALIDATION_ERROR: "Please check that the URL is correct.",
  FETCH_FAILED: "Please try again later or use a different link.",
  FALLBACK
}

const bookmark: ErrorMessages = {
  VALIDATION_ERROR: "Please check the entered data.",
  FALLBACK
}

export const errorMessages = {
  auth,
  link,
  bookmark
}
