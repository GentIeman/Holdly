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

  <HAlert
    v-model="isAlertOpen"
    title="Delete bookmark?"
    description="This action cannot be undone."
    message="This will permanently delete the bookmark and all associated data. You will not be able to recover it."
    :buttons="{
      cancel: { label: 'Cancel', color: 'neutral' },
      action: { label: 'Delete', icon: 'tabler-trash', color: 'rose' }
    }"
    @confirm="confirm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useNotifications } from "@vuetify/v0"
import type { AlertDialogActionEvent } from "@vuetify/v0"

import HDropdownMenu, { type HDropdownMenuItem } from "@/components/ui/HDropdownMenu.vue"
import HAlert from "@/components/ui/HAlert.vue"
import HButton from "@/components/ui/HButton.vue"
import { getErrorMessage } from "@/utils/api"
import { errorMessages } from "@/utils/errorMessages"
import { Bookmark, useBookmarkStore } from "@/features/bookmark/stores/bookmark"

const props = defineProps<{
  bookmark: Bookmark
}>()

const notifications = useNotifications()
const { deleteBookmark } = useBookmarkStore()

const isAlertOpen = ref(false)

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
      icon: "tabler-trash",
      color: "rose",
      onSelect: () => {
        isAlertOpen.value = true
      }
    }
  ]
]

async function confirm({ wait, close }: AlertDialogActionEvent) {
  wait()

  try {
    await deleteBookmark(props.bookmark.documentId)
  } catch (cause) {
    notifications.send({
      subject: getErrorMessage(cause, errorMessages.bookmark),
      severity: "error"
    })
  } finally {
    close()
  }
}
</script>