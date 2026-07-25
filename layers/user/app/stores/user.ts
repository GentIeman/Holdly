import { defineStore } from "pinia"

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
    const config = useRuntimeConfig()
    user.value = await $fetch<User>("/api/me", {
      baseURL: config.public.apiBase as string,
      credentials: "include"
    })
  }

  return {
    user,
    fetchMe
  }
})