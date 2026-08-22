<template>
  <HContainer class="page">
    <p class="bg-text">POCKET<span class="highlight">ALTERNATIVE</span></p>
    <HContainer class="form-card">
      <Component :is="isSignIn ? signInForm : signUpForm" />
      <HContainer class="form-footer">
        <HSeparator label="or" />
        {{ isSignIn ? "I don't have an" : "I have an" }}
        <HButton
          label="account"
          variant="link"
          type="button"
          @click="isSignIn = !isSignIn"
        />
      </HContainer>
    </HContainer>
  </HContainer>
</template>

<script setup lang="ts">
import { ref } from "vue"

import HButton from "@/components/ui/HButton.vue"
import HContainer from "@/components/ui/HContainer.vue"
import HSeparator from "@/components/ui/HSeparator.vue"
import signInForm from "@/features/user/components/signInForm.vue"
import signUpForm from "@/features/user/components/signUpForm.vue"

const isSignIn = ref(true)
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  .bg-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    height: 100dvh;
    padding: 2rem;
    font-size: 30px;
    color: var(--color-zinc-800);
    user-select: none;

    @media (min-width: 1024px) {
      justify-content: center;
      font-size: 250px;
    }

    .highlight {
      text-decoration: underline;
      text-decoration-color: var(--color-teal-500);
    }
  }
}

.form-card {
  display: grid;
  gap: 1rem;
  padding: 2.5rem;
  width: 512px;
  height: fit-content;
  border-radius: 0.75rem;
  border: 1px solid var(--color-zinc-700);
  backdrop-filter: blur(12px);

  .form-footer {
    @media (min-width: 1024px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>