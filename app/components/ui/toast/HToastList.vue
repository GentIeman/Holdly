<template>
  <Snackbar.Portal :class="$style.portal">
    <Snackbar.Queue v-slot="{ items }">
      <TransitionGroup name="snack-list-slide">
        <HToast
          v-for="(item, i) in items"
          :key="item.id"
          :item="item"
          :index="i"
          :is-current="i === items.length - 1"
        />
      </TransitionGroup>
    </Snackbar.Queue>
  </Snackbar.Portal>
</template>

<script setup lang="ts">
import { Snackbar } from "@vuetify/v0"
import HToast from "./HToast.vue"
</script>

<style module>
.portal {
  position: fixed;
  bottom: var(--spacing-2xl);
  right: var(--spacing-2xl);
}
</style>

<style scoped>
.snack-list-slide-move,
.snack-list-slide-enter-active,
.snack-list-slide-leave-active {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.snack-list-slide-enter-from,
.snack-list-slide-leave-to {
  opacity: 0;
  transform: translateX(70px);
}
</style>