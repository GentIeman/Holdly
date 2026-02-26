<template>
  <UForm
      :schema="schema"
      :state="state"
      class="grid gap-4 h-fit"
      @submit.prevent="handleSubmit">
    <h1 class="text-center text-xl font-semibold">Sign Up</h1>
    <UFormField
        label="Username"
        size="lg"
        required
        name="username">
      <UInput
          v-model="state.username"
          placeholder="Your username"
          autocomplete="autocomplete"
          class="w-full"/>
    </UFormField>
    <UFormField
        label="Email"
        size="lg"
        required
        name="email">
      <UInput
          v-model="state.email"
          placeholder="mail@example.com"
          autocomplete="autocomplete"
          class="w-full"/>
    </UFormField>
    <UFormField
        label="Password"
        placeholder="Enter password"
        size="lg"
        required
        name="password">
      <InputPassword
          v-model="state.password"
          placeholder="Enter password"
          class="w-full"/>
    </UFormField>
    <UButton
        size="lg"
        block
        type="submit"
        label="Sign Up" />
  </UForm>
</template>

<script setup lang="ts">
import * as z from "zod"
import type {FormSubmitEvent} from '@nuxt/ui'
import InputPassword from "#layers/form/app/components/InputPassword.vue"

const schema = z.object({
  email: z
      .email('Please enter a valid email address')
      .min(6, "Email must be at least 6 characters long"),
  password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  username: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
});

type Schema = z.output<typeof schema>

const state = ref<Schema>({
  email: "",
  password: "",
  username: ""
})

const toast = useToast()
const router = useRouter()

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/register", {
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password,
      username: event.data.username
    },
    onResponseError() {
      toast.add({
        title: "Oops, something went wrong!",
        color: "error"
      })
    }
  })

  await router.push("/")
}
</script>

<style scoped>

</style>