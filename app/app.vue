<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
  <HToast />
</template>

<script setup lang="ts">
import HToast from "~/components/ui/HToast.vue"
</script>

<style>
html,
body {
  height: 100vh;
}
</style>