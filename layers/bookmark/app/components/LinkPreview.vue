<template>
  <article
      v-if="metadata"
      class="grid gap-3">
    <div>
      <p
          v-if="metadata.siteName"
          class="text-primary font-bold">
        {{ metadata.siteName }}
      </p>
      <h3 class="font-bold">{{ metadata.title }}</h3>
    </div>
    <img
        v-if="metadata.preview"
        :src="metadata.preview"
        class="aspect-video"
        :alt="metadata.title">
  </article>
</template>

<script setup lang="ts">

export type LinkMetaData = {
  title: string
  preview?: string
  description?: string
  siteName?: string
}

defineProps<{
  metadata: LinkMetaData
}>()
</script>