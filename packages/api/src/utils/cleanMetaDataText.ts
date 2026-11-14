import { decode } from "he"

export default function cleanMetaDataText(value?: string) {
  if (!value) return ""

  return decode(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
}