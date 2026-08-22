<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <HToastList />
</template>

<script setup lang="ts">
import HToastList from "~/components/ui/toast/HToastList.vue"
</script>

<style>
html,
body {
  height: 100vh;
}
</style>