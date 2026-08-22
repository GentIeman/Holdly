<template>
  <div>
    <HHeader />
    <main class="main">
      <slot />
    </main>
    <HContainer class="bottom-bar">
      <AddBookmarkModal />
    </HContainer>
  </div>
</template>
<script setup lang="ts">
import HHeader from "~/components/layout/HHeader.vue"
import HContainer from "~/components/ui/HContainer.vue"
import AddBookmarkModal from "~/components/bookmark/AddBookmarkModal.vue"
</script>

<style scoped>
.main {
  width: 100%;
  max-width: var(--container-xl);
  margin: auto;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: grid;
  place-items: center;
  padding-block: 1.25rem;
  background: linear-gradient(to bottom, transparent, var(--color-zinc-950));

  @media (min-width: 640px) {
    display: none;
  }
}
</style>