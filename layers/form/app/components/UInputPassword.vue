<template>
  <UInput
      class="w-full"
      placeholder="Password"
      :type="show ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
      />
    </template>
  </UInput>
</template>

<script setup lang="ts">
const show = ref(false)
</script>

<style scoped>

</style>