import { defineStore } from "pinia"
import { ref } from "vue"

import { api } from "@/utils/api"

export type User = {
  blocked: boolean
  createdAt: string
  documentId: string
  email: string
  id: number
  username: string
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)

  const fetchMe = async () => {
    user.value = await api<User>("/api/me")
  }

  return {
    user,
    fetchMe
  }
})