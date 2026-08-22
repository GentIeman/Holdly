<template>
  <HContainer
    :class="[
      $style.bookmarks,
      {
        [$style.cards]: view === 'cards',
        [$style.empty]: isBookmarksEmpty
      }
    ]"
  >
    <component
      :is="BookmarkComponentMap[props.view]"
      v-for="bookmark in bookmarks"
      :key="bookmark.documentId"
      :bookmark="bookmark"
    />
    <div
      v-if="isBookmarksEmpty"
      :class="$style.emptyState"
    >
      <HIcon
        icon="tabler-bookmark"
        size="xl"
      />
      <p :class="$style.emptyStateTitle">It looks like you haven't added any bookmarks</p>
      <HButton
        icon="tabler-plus"
        label="Add"
      />
    </div>
  </HContainer>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue"
import HContainer from "@/components/ui/HContainer.vue"
import HIcon from "@/components/ui/HIcon.vue"
import HButton from "@/components/ui/HButton.vue"
import BookmarkCardView from "./BookmarkCardView.vue"
import BookmarkListView from "./BookmarkListView.vue"
import BookmarkHeadlineView from "./BookmarkHeadlineView.vue"
import type { Bookmark } from "@/features/bookmark/stores/bookmark"

export type BookmarkView = "cards" | "list" | "headlines"

const props = withDefaults(
  defineProps<{
    bookmarks: Bookmark[]
    view?: BookmarkView
  }>(),
  {
    view: "cards"
  }
)

const isBookmarksEmpty = computed(() => props.bookmarks.length < 1)

const BookmarkComponentMap = {
  cards: BookmarkCardView,
  list: BookmarkListView,
  headlines: BookmarkHeadlineView
} satisfies Record<BookmarkView, Component>
</script>

<style module>
.bookmarks {
  display: grid;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: var(--container-xl);

  .emptyState {
    display: grid;
    justify-items: center;
    gap: var(--spacing-2xl);
    padding-block: var(--spacing-3xl);
    color: var(--color-zinc-500);

    .emptyStateTitle {
      text-align: center;
    }
  }
}

.cards {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr));
}

.empty {
  grid-template-columns: 1fr;
}
</style>