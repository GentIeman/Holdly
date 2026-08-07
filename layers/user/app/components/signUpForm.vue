<template>
  <HForm
    class="form"
    :schema="schema"
    @submit="handleSubmit"
  >
    <h1 class="title">Sign Up</h1>
    <HInput
      v-model="state.username"
      label="Username"
      name="username"
      size="md"
      required
      placeholder="Your username"
      autocomplete="username"
    />
    <HInput
      v-model="state.email"
      label="Email"
      name="email"
      size="sm"
      required
      placeholder="mail@example.com"
      autocomplete="email"
    />
    <HInputPassword
      v-model="state.password"
      label="Password"
      size="md"
      name="password"
      required
      placeholder="Enter password"
    />
    <HButton
      size="md"
      variant="solid"
      type="submit"
      label="Sign up"
    />
  </HForm>
</template>

<script setup lang="ts">
import * as z from "zod"
import HForm from "~/components/ui/form/HForm.vue"
import HInput from "~/components/ui/form/HInput.vue"
import { type User, useUserStore } from "~~/layers/user/app/stores/user"
import HButton from "~/components/ui/HButton.vue"
import HInputPassword from "~/components/ui/form/HInputPassword.vue"
import { useNotifications } from "@vuetify/v0"

const schema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z
    .email("Please enter a valid email address")
    .min(6, "Email must be at least 6 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

const state = ref({
  email: "",
  password: "",
  username: ""
})

const notifications = useNotifications()
const router = useRouter()
const userStore = useUserStore()
const config = useRuntimeConfig()

type RegisterResponse = {
  user: User
}

async function handleSubmit({ valid }: { valid: boolean }) {
  if (!valid) return

  const data = await $fetch<RegisterResponse>("/api/register", {
    baseURL: config.public.apiBase as string,
    method: "POST",
    body: {
      email: state.value.email,
      password: state.value.password,
      username: state.value.username
    },
    credentials: "include",
    onResponseError() {
      notifications.send({
        subject: "Oops, something went wrong!",
        severity: "error"
      })
    }
  })

  userStore.user = data.user
  await router.push("/")
}
</script>

<style scoped>
.form {
  display: grid;
  gap: 1rem;

  .title {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>