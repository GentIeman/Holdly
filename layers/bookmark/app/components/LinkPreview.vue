<template>
  <section>
    <p class="text-primary font-bold">{{ preview?.siteName }}</p>
    <h1 class="font-bold">{{ preview?.title }}</h1>
    <h2 class="line-clamp-2 text-neutral-300">{{ preview?.description }}</h2>
    <img
        v-if="preview?.image"
        :src="preview?.image"
        alt="Link preview">
  </section>
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