<template>
  <main>
    <UContainer
        class="grid gap-4"
        :class="{
          'grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))]': ['cards'].includes(viewMode),
        }">
      <Bookmark
          v-for="bookmark in bookmarks"
          :key="bookmark.documentId"
          as="article"
          :view="viewMode"
          :bookmark="bookmark"/>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import type {BookmarkView} from "~/layers/bookmark/components/Bookmark.vue"
import type {Response as BookmarksResponse} from "~/layers/bookmark/server/api/bookmarks.get"

const {data: bookmarks} = await useFetch<BookmarksResponse>("/api/bookmarks", {
  default: () => []
})

const bookmarkStore = useBookmarkStore()
const {bookmarks} = storeToRefs(bookmarkStore)
const user = useStrapiUser()

definePageMeta({
  middleware: ['auth'],
})

// temporary solution to switch between view modes
const viewMode: BookmarkView = 'cards'
</script>

<style scoped>

</style>