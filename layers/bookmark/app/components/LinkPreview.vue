<template>
  <article
      v-if="metadata"
      class="grid gap-3">
    <div>
      <p class="text-primary font-bold">{{ metadata.siteName }}</p>
      <h3 class="font-bold">{{ metadata.title }}</h3>
    </div>
      <img
          v-if="metadata.preview"
          :src="metadata.preview"
          alt="Link preview"
      >
  </article>
</template>

<script setup lang="ts">

export type LinkMetaData = {
  title: string
  preview: string | null
  description: string | null
  siteName: string | null
}

defineProps<{
  metadata: LinkMetaData
}>()
</script>