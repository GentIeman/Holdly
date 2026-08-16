<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- @TODO The Toast list z-index is lower than the modal window -->
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