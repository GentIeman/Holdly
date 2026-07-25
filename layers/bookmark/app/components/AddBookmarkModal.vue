<template>
  <UModal
    v-model:open="isModalOpen"
    title="Save Link"
    description="Paste a link and save it for later"
    :close="{
      color: 'neutral'
    }"
    @after:leave="resetState"
  >
    <UButton
      label="Save link"
      color="primary"
      class="sm:w-fit"
      block
      size="lg"
    />

    <template #body>
      <div class="grid gap-1">
        <LinkPreview
          v-if="metadata"
          :metadata="metadata"
        />
        <UForm
          :schema="schema"
          :state="state"
          class="grid gap-4 h-fit"
          @submit.prevent="handleCreateBookmark"
        >
          <UFormField
            label="Link"
            name="link"
            required
          >
            <UInput
              v-model="state.link"
              placeholder="https://example.com"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UButton
            type="submit"
            label="Save"
            size="lg"
            block
          />
        </UForm>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import * as z from "zod"
import LinkPreview from "~~/layers/bookmark/app/components/LinkPreview.vue"
import { useLinkMetaData } from "~~/layers/bookmark/app/composables/useLinkMetaData"
import { useUserStore } from "~~/layers/user/app/stores/user"
import { useBookmarkStore } from "~~/layers/bookmark/app/stores/bookmark"
import { ref } from "vue"
import type { Bookmark } from "~~/layers/bookmark/app/components/Bookmark.vue"
import { resetFormState } from "~/utils/resetFormState"

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

const toast = useToast()

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
        toast.add({
          title: "Upps...",
          description: "Something went wrong",
          color: "error"
        })
      }
    })
    await fetchBookmarks()
  } finally {
    isModalOpen.value = false
  }
}
</script>

<style scoped></style>