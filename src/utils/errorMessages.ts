export type ErrorMessages = Partial<Record<string, string>> & { FALLBACK: string }

const auth: ErrorMessages = {
  UNAUTHORIZED: "Invalid email or password.",
  VALIDATION_ERROR: "Please check the entered data.",
  UPSTREAM_ERROR: "Please try again later.",
  INTERNAL_ERROR: "Please try again later.",
  FALLBACK: "Oops, something went wrong!"
}

const link: ErrorMessages = {
  VALIDATION_ERROR: "Please check that the URL is correct.",
  FETCH_FAILED: "Please try again later or use a different link.",
  FETCH_TIMEOUT: "Please try again later or use a different link.",
  FALLBACK: "Could not load the link preview."
}

const bookmark: ErrorMessages = {
  VALIDATION_ERROR: "Please check the entered data.",
  UPSTREAM_ERROR: "Please try again later.",
  FALLBACK: "Could not save the bookmark."
}

export const errorMessages = {
  auth,
  link,
  bookmark
}