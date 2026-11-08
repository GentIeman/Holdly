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
          v-if="isLoaded"
          :metadata="metadata"
        />
        <HForm
          :schema="schema"
          :class="$style.form"
          @submit="saveBookmark"
        >
          <HInput
            v-model="state.link"
            label="Link"
            name="link"
            required
            placeholder="https://example.com"
            size="lg"
            @change="handleLinkChange"
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
import { storeToRefs } from "pinia"

import * as z from "zod"
import { useNotifications } from "@vuetify/v0"

import HModal from "@/components/ui/HModal.vue"
import HButton from "@/components/ui/HButton.vue"
import HForm from "@/components/ui/form/HForm.vue"
import HInput from "@/components/ui/form/HInput.vue"
import { api, getErrorMessage } from "@/utils/api"
import { errorMessages } from "@/utils/errorMessages"
import LinkPreview from "./LinkPreview.vue"
import { useLinkMetaData } from "@/features/bookmark/composables/useLinkMetaData"
import { useBookmarkStore, type Bookmark } from "@/features/bookmark/stores/bookmark"
import { useUserStore } from "@/features/user/stores/user"
import { resetFormState } from "@/utils/resetFormState"

const schema = z.object({
  link: z.httpUrl()
})

type BookmarkState = {
  link: string
}

const state = ref<BookmarkState>({ link: "" })

const isModalOpen = ref(false)
const { metadata, isLoaded, fetchMetaData, reset } = useLinkMetaData(() => state.value.link)

const resetState = () => {
  resetFormState<BookmarkState>(state, () => ({ link: "" }))
  reset()
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { fetchBookmarks } = useBookmarkStore()
const notifications = useNotifications()

async function saveBookmark({ valid }: { valid: boolean }) {
  if (!valid || !user.value) return

  try {
    await api<Bookmark>("/api/bookmark", {
      method: "POST",
      body: {
        link: state.value.link,
        title: metadata.value.title,
        description: metadata.value?.description,
        preview: metadata.value?.preview,
        user: user.value.documentId
      }
    })
    await fetchBookmarks()
    isModalOpen.value = false
  } catch (cause) {
    notifications.send({
      subject: getErrorMessage(cause, errorMessages.bookmark),
      severity: "error"
    })
  }
}

async function handleLinkChange() {
  try {
    await fetchMetaData()
  } catch (cause) {
    notifications.send({
      subject: getErrorMessage(cause, errorMessages.link),
      severity: "error"
    })
  }
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