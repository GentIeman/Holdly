<template>
  <article
      v-if="preview"
      class="grid gap-3">
    <div>
      <p class="text-primary font-bold">{{ preview.siteName }}</p>
      <h3 class="font-bold">{{ preview.title }}</h3>
    </div>
      <img
          v-if="preview.image"
          :src="preview.image"
          alt="Link preview"
      >
  </article>
</template>

<script setup lang="ts">

export type LinkPreview = {
  title: string
  image: string | null
  description: string | null
  siteName: string | null
}

defineProps<{
  preview: LinkPreview
}>()
</script>