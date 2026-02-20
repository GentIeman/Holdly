<template>
  <div>
    <AppHeader/>
    <slot/>
    <UContainer
        class="fixed bottom-0 w-full grid sm:hidden place-items-center py-5 bg-linear-to-b to-neutral-950">
      <LazyAddBookmarkModal/>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~~/layers/base/app/components/global/AppHeader.vue";
</script>