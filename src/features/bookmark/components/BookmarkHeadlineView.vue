<template>
  <article :class="$style.headline">
    <div :class="$style.body">
      <h2 :class="$style.title">
        <a
          :href="bookmark.link"
          target="_blank"
          :class="$style.link"
        >
          {{ bookmark.title }}
        </a>
      </h2>
      <p :class="$style.domain">{{ getDomain(bookmark.link) }}</p>
    </div>
    <footer :class="$style.footer">
      <BookmarkDropdownMenu :bookmark="bookmark" />
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Bookmark } from "@/features/bookmark/stores/bookmark"
import BookmarkDropdownMenu from "./BookmarkDropdownMenu.vue"
import { getDomain } from "@/utils/getDomain"

defineProps<{
  bookmark: Bookmark
}>()
</script>

<style module>
.headline {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xl);
  padding: 0.875rem;
  border: 2px solid var(--color-zinc-800);
  border-radius: 0.75rem;
  overflow: clip;

  .body {
    display: grid;
    gap: var(--spacing-sm);
    min-width: 0;
  }

  .title {
    font-size: 1.25rem;

    .link {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .domain {
    font-size: var(--font-size-sm);
    color: var(--color-teal-500);
  }

  .footer {
    display: flex;
    align-items: flex-start;
  }
}
</style>