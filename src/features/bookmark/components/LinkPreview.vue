<template>
  <article
    v-if="metadata"
    :class="$style.preview"
  >
    <HContainer>
      <p
        v-if="metadata.siteName"
        :class="$style.site"
      >
        {{ metadata.siteName }}
      </p>
      <h3 :class="$style.title">{{ metadata.title }}</h3>
    </HContainer>
    <img
      v-if="metadata.preview"
      :src="metadata.preview"
      :class="$style.image"
      :alt="metadata.title"
    />
  </article>
</template>

<script setup lang="ts">
import HContainer from "@/components/ui/HContainer.vue"

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

<style module>
.preview {
  display: grid;
  gap: var(--spacing-3xl);

  .site {
    color: var(--color-teal-500);
    font-weight: 700;
  }

  .title {
    font-weight: 700;
  }

  .image {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
  }
}
</style>