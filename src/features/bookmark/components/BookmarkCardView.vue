<template>
  <article :class="$style.card">
    <header v-if="bookmark.preview">
      <img
        :src="bookmark.preview"
        :alt="bookmark.title"
        :class="$style.image"
      />
    </header>
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
      <p
        v-if="bookmark.preview"
        :class="$style.description"
      >
        {{ bookmark.description }}
      </p>
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
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-xl);
  padding: 0.875rem;
  border: 2px solid var(--color-zinc-800);
  border-radius: 0.75rem;
  min-height: 400px;
  max-height: 500px;

  .image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: var(--radius-lg);
  }

  .body {
    display: grid;
    gap: var(--spacing-sm);

    .domain {
      font-size: var(--font-size-sm);
      color: var(--color-teal-500);
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

    .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-wrap: pretty;
      overflow: hidden;
      color: var(--color-zinc-500);
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>