<template>
  <HDropdownMenu
    position-area="bottom span-left"
    :items="items"
  >
    <template #activator="{ attrs }">
      <HButton
        v-bind="attrs"
        type="button"
        variant="outline"
        color="neutral"
        icon="tabler-dots"
        aria-label="Bookmark actions"
      />
    </template>
  </HDropdownMenu>
</template>

<script setup lang="ts">
import HDropdownMenu, { type HDropdownMenuItem } from "@/components/ui/HDropdownMenu.vue"
import HButton from "@/components/ui/HButton.vue"
import type { Bookmark } from "@/features/bookmark/stores/bookmark"

const props = defineProps<{
  bookmark: Bookmark
}>()

const items: HDropdownMenuItem[][] = [
  [
    {
      label: "Add to Favorite",
      icon: "tabler-star"
    },
    {
      label: "Add to Collection",
      icon: "tabler-folder"
    }
  ],
  [
    {
      label: "Open in new tab",
      icon: "tabler-external-link",
      onSelect: () => window.open(props.bookmark.link, "_blank")
    }
  ],
  [
    {
      label: "Delete",
      icon: "tabler-trash"
    }
  ]
]
</script>