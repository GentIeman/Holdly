<template>
  <HForm
    class="form"
    :schema="schema"
    @submit="handleSubmit"
  >
    <h1 class="title">Sign In</h1>
    <HInput
      v-model="state.email"
      label="Email"
      name="email"
      size="md"
      required
      autocomplete="email"
      placeholder="mail@example.com"
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
      label="Continue"
    />
  </HForm>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import * as z from "zod"
import { useNotifications } from "@vuetify/v0"

import HButton from "@/components/ui/HButton.vue"
import HForm from "@/components/ui/form/HForm.vue"
import HInput from "@/components/ui/form/HInput.vue"
import HInputPassword from "@/components/ui/form/HInputPassword.vue"
import { api } from "@/utils/api"
import { type User, useUserStore } from "@/features/user/stores/user"

const schema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(6, "Email must be at least 6 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

const state = ref({
  email: "",
  password: ""
})

const notifications = useNotifications()
const router = useRouter()
const userStore = useUserStore()

type LoginResponse = {
  user: User
}

async function handleSubmit({ valid }: { valid: boolean }) {
  if (!valid) return

  const data = await api<LoginResponse>("/api/login", {
    method: "POST",
    body: {
      identifier: state.value.email,
      password: state.value.password
    },
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