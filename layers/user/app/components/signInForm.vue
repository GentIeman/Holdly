<template>
  <UForm
    :schema="schema"
    :state="state"
    class="grid gap-4"
    @submit.prevent="handleSubmit"
  >
    <h1 class="text-center text-xl font-semibold">Sign In</h1>
    <UFormField
      label="Email"
      size="lg"
      required
      name="email"
    >
      <UInput
        v-model="state.email"
        placeholder="mail@example.com"
        autocomplete="autocomplete"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Password"
      size="lg"
      required
      name="password"
    >
      <InputPassword
        v-model="state.password"
        placeholder="Enter password"
        class="w-full"
      />
    </UFormField>
    <UButton
      size="lg"
      block
      type="submit"
      label="Continue"
    />
  </UForm>
</template>

<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"
import InputPassword from "#layers/form/app/components/InputPassword.vue"
import { type User, useUserStore } from "~~/layers/user/app/stores/user"

const schema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(6, "Email must be at least 6 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

type Schema = z.output<typeof schema>

const state = ref<Schema>({
  email: "",
  password: ""
})

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const config = useRuntimeConfig()

type LoginResponse = {
  user: User
}

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  const data = await $fetch<LoginResponse>("/api/login", {
    baseURL: config.public.apiBase as string,
    method: "POST",
    body: {
      identifier: event.data.email,
      password: event.data.password
    },
    credentials: "include",
    onResponseError() {
      toast.add({
        title: "Oops, something went wrong!",
        color: "error"
      })
    }
  })

  userStore.user = data.user
  await router.push("/")
}
</script>

<style scoped></style>