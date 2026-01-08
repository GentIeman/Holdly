<template>
  <article
      class="flex gap-3 border-2 border-solid rounded-xl border-neutral-800 overflow-clip p-3.5"
      :class="[{'flex-col': viewChecks.isCards}]">
    <header
        v-if="bookmark.preview && viewChecks.isCardsOrList"
        :class="[{'max-h-30': !viewChecks.isCards}]">
      <img
          :src="mediaPath"
          alt=""
          :width="bookmark.preview?.width"
          :height="bookmark.preview?.height"
          class="object-cover rounded-lg h-full"
          :class="[{'max-w-35': !viewChecks.isCards}]">
    </header>
    <div>
      <h3 class="text-xl line-clamp-2">{{ bookmark.title }}</h3>
      <p class="text-primary text-sm">{{ domain }}</p>
      <p
          v-if="viewChecks.isCardsOrList"
          class="text-neutral-500 text-pretty"
          :class="[{'line-clamp-4': bookmark.preview && viewChecks.isCardsOrList}]">
        {{ bookmark.description }}
      </p>
    </div>
  </article>
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

const config = useRuntimeConfig()

const mediaPath = computed(() => {
  return config.public.strapiOrigin + props.bookmark.preview.url
})

const domain = computed(() => {
  return props.bookmark.link.replace(/^(https?:\/\/)?(www\.)?([^/]+).*/, "$3")
})

const viewChecks = computed(() => ({
  isCards: ['cards'].includes(props.view),
  isCardsOrList: ['cards', 'list'].includes(props.view),
}));

</script>

<style scoped>

</style>