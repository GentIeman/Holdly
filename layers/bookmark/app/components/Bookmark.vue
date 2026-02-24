<template>
  <article
      class="flex gap-3 border-2 border-solid rounded-xl border-neutral-800 overflow-clip p-3.5 justify-between"
      :class="[{'flex-col': viewChecks.isCards}]">
    <header
        v-if="bookmark.preview && viewChecks.isCardsOrList"
        :class="[{'max-h-30': !viewChecks.isCards}]">
      <img
          :src="bookmark.preview"
          :alt="bookmark.title"
          class="aspect-video object-cover rounded-lg h-full"
          :class="[{'max-w-35': !viewChecks.isCards}]">
    </header>
    <div>
      <h2 class="text-xl">
        <NuxtLink
            :to="bookmark.link"
            target="_blank"
            class="line-clamp-2">
          {{ bookmark.title }}
        </NuxtLink>
      </h2>
      <p class="text-primary text-sm">{{ domain }}</p>
      <p
          v-if="viewChecks.isCardsOrList"
          class="text-neutral-500 text-pretty"
          :class="[{'line-clamp-4': bookmark.preview && viewChecks.isCardsOrList}]">
        {{ bookmark.description }}
      </p>
    </div>
    <footer class="flex justify-end items-start">
      <UDropdownMenu
          class="h-max"
          :items="dropDownItems"
          :content="{
            align: 'end',
            side: 'bottom',
          }"
      >
        <UButton
            icon="i-lucide-ellipsis"
            color="neutral"
            size="lg"
            variant="outline"/>
      </UDropdownMenu>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type {User} from "~~/layers/user/app/composables/useUser"
import type {DropdownMenuItem} from '@nuxt/ui'

export type BookmarkView = "cards" | "list" | "headlines"

export type Bookmark = {
  documentId: string
  title: string
  description: string
  link: string
  preview: string
  createdAt: string
  user: User
}

const props = withDefaults(defineProps<{
  bookmark: Bookmark
  view?: BookmarkView
}>(), {
  view: 'cards'
})

const domain = computed(() => {
  return props.bookmark.link.replace(/^(https?:\/\/)?(www\.)?([^/]+).*/, "$3")
})

const viewChecks = computed(() => ({
  isCards: ['cards'].includes(props.view),
  isCardsOrList: ['cards', 'list'].includes(props.view),
}));

const dropDownItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Add to Favorite',
      icon: 'i-lucide-star'
    },
    {
      label: 'Add to Collection',
      icon: 'i-lucide-folder'
    },
  ],
  [
    {
      label: 'Open in new tab',
      icon: 'i-lucide-external-link',
      to: props.bookmark.link,
      target: '_blank'
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: "error"
    },
  ]
])

</script>

<style scoped>

</style>