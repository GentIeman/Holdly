<template>
  <HModal
    v-model="isModalOpen"
    title="Save Link"
    description="Paste a link and save it for later"
    @close="resetState"
  >
    <template #trigger="{ attrs }">
      <HButton
        v-bind="attrs"
        label="Save link"
        variant="solid"
      />
    </template>

    <template #body>
      <div :class="$style.body">
        <LinkPreview
          v-if="metadata"
          :metadata="metadata"
        />
        <HForm
          :schema="schema"
          :class="$style.form"
          @submit="onSubmit"
        >
          <HInput
            v-model="state.link"
            label="Link"
            name="link"
            required
            placeholder="https://example.com"
            size="lg"
            @change="fetchMetaData"
          />
          <HButton
            type="submit"
            label="Save"
            variant="solid"
            size="lg"
          />
        </HForm>
      </div>
    </template>
  </HModal>
</template>

<script setup lang="ts">
import { ref } from "vue"

import * as z from "zod"
import { useNotifications } from "@vuetify/v0"

import HModal from "@/components/ui/HModal.vue"
import HButton from "@/components/ui/HButton.vue"
import HForm from "@/components/ui/form/HForm.vue"
import HInput from "@/components/ui/form/HInput.vue"
import { api } from "@/utils/api"
import LinkPreview from "./LinkPreview.vue"
import { useLinkMetaData } from "@/features/bookmark/composables/useLinkMetaData"
import { useBookmarkStore, type Bookmark } from "@/features/bookmark/stores/bookmark"
import { useUserStore } from "@/features/user/stores/user"
import { resetFormState } from "@/utils/resetFormState"

const schema = z.object({
  link: z.url()
})

type BookmarkState = {
  link: string
}

const state = ref<BookmarkState>({ link: "" })

const resetState = () => resetFormState(state, () => ({ link: "" }))

const isModalOpen = ref(false)
const { metadata, fetchMetaData } = useLinkMetaData(() => state.value.link)

const userStore = useUserStore()
const { fetchBookmarks } = useBookmarkStore()
const notifications = useNotifications()

const handleCreateBookmark = async () => {
  try {
    await api<Bookmark>("/api/bookmark", {
      method: "POST",
      body: {
        link: state.value.link,
        title: metadata.value.title,
        description: metadata.value.description,
        preview: metadata.value.preview,
        user: userStore.user?.documentId
      },
      onResponseError() {
        notifications.send({
          subject: "Oops, something went wrong!",
          severity: "error"
        })
      }
    })
    await fetchBookmarks()
  } finally {
    isModalOpen.value = false
  }
}

async function onSubmit({ valid }: { valid: boolean }) {
  if (!valid) return
  await handleCreateBookmark()
}
</script>

<style module>
.body {
  display: grid;
  gap: var(--spacing-s);

  .form {
    display: grid;
    gap: var(--spacing-2xl);
  }
}
</style>