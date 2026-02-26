<template>
  <UContainer class="flex justify-center items-center h-dvh">
    <p class="flex flex-col p-8 items-center lg:justify-center absolute text-[30px] lg:text-[250px] text-neutral-800 select-none h-dvh">
      POCKET<span class="underline decoration-primary-500">ALTERNATIVE</span>
    </p>
    <UContainer class="grid gap-4 p-10 w-lg h-fit rounded-xl border border-neutral-700 backdrop-blur-md">
      <Component :is="isSignIn ? signInForm : signUpForm" />
      <UContainer class="lg:px-0">
        <USeparator label="or"/>
        {{ isSignIn ? "I don't have an" : "I have an" }}
        <UButton
            class="px-0 text-md cursor-pointer"
            variant="link"
            label="account"
            @click="isSignIn = !isSignIn"/>
      </UContainer>
    </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
import signInForm from "~~/layers/user/app/components/signInForm.vue"
import signUpForm from "~~/layers/user/app/components/signUpForm.vue"

const isSignIn = ref(true)

definePageMeta({
  layout: "sign"
})
</script>

<style scoped>

</style>