<template>
  <HModal
    v-model="isModalOpen"
    title="Save Link"
    description="Paste a link and save it for later"
    @close="resetState"
  >
    <template #trigger>
      <HButton
        label="Save link"
        variant="solid"
        size="md"
        :class="$style.openButton"
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
import * as z from "zod"
import HModal from "~/components/ui/HModal.vue"
import HForm from "~/components/ui/form/HForm.vue"
import HInput from "~/components/ui/form/HInput.vue"
import HButton from "~/components/ui/HButton.vue"
import LinkPreview from "./LinkPreview.vue"
import { useLinkMetaData } from "~~/layers/bookmark/app/composables/useLinkMetaData"
import { useUserStore } from "~~/layers/user/app/stores/user"
import { useBookmarkStore } from "~~/layers/bookmark/app/stores/bookmark"
import type { Bookmark } from "~~/layers/bookmark/app/stores/bookmark"
import { resetFormState } from "~/utils/resetFormState"
import { useNotifications } from "@vuetify/v0"

const schema = z.object({
  link: z.url()
})

type BookmarkState = {
  link: string
}

const state = ref<BookmarkState>({ link: "" })

const resetState = () => resetFormState(state, () => ({ link: "" }))

const isModalOpen = ref(false)
const { metadata } = useLinkMetaData(() => state.value.link)

const userStore = useUserStore()
const { fetchBookmarks } = useBookmarkStore()
const config = useRuntimeConfig()
const notifications = useNotifications()

const handleCreateBookmark = async () => {
  try {
    await $fetch<Bookmark>("/api/bookmark", {
      baseURL: config.public.apiBase as string,
      method: "POST",
      credentials: "include",
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

.openButton {
  width: 100%;
  justify-content: center;
}

@media (min-width: 640px) {
  .openButton {
    width: fit-content;
  }
}
</style>