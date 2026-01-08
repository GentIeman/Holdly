<template>
  <UCard>
    <template
        v-if="viewChecks.isCards"
        #header>
      <img
          :src="mediaPath + bookmark.preview?.url"
          alt=""
          :width="bookmark.preview?.width"
          :height="bookmark.preview?.height"
          class="object-cover rounded-lg">
    </template>
    <div class="grid gap-2">
      <h3 class="text-xl">{{ bookmark.title }}</h3>
      <p
          v-if="viewChecks.isCardsOrLines"
          class="text-neutral-500 line-clamp-3"> {{ bookmark.description }}</p>
      <div class="flex gap-3">
        <UBadge
            :label="linkBadgeLabel"
            class="rounded-full"/>
        <p>{{ formattedCreatedAt }}</p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type {User} from "~/layers/user/composables/useUser"

export type BookmarkView = "cards" | "list" | "headlines"

type Preview = {
  documentId: string
  url: string
  width: string
  height: string
}

export type Bookmark = {
  documentId: string
  title: string
  description: string
  link: string
  preview: Preview
  createdAt: string
  user: User
}

const props = withDefaults(defineProps<{
  bookmark: Bookmark
  view?: BookmarkView
}>(), {
  view: 'cards'
})

const mediaPath = useStrapiMedia("/")

const linkBadgeLabel = computed(() => {
  return props.bookmark.link.replace(/^https?:\/\//, '')
})

const formattedCreatedAt = computed(() => {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(props.bookmark.createdAt))
})

const viewChecks = computed(() => ({
  isCards: ['cards'].includes(props.view),
  isCardsOrList: ['cards', 'list'].includes(props.view),
}));

</script>

<style scoped>

</style>