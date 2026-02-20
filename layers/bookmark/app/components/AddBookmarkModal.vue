<template>
  <UModal
      v-model:open="isModalOpen"
      title="Save Link"
      description="Paste a link and save it for later"
      :close="{
        color: 'neutral',
      }"
      @after:leave="resetState">
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
            :metadata="metadata"/>
        <DynamicForm
            v-model:state="state"
            :schema="schema"
            class="grid gap-4 h-fit"
            :validation-schema="bookmarkSchema"
            @submit="handleCreateBookmark"/>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {bookmarkSchema} from "~~/layers/bookmark/validators/bookmarkRules"
import DynamicForm from "~~/layers/form/app/components/global/DynamicForm.vue"
import LinkPreview from "~~/layers/bookmark/app/components/LinkPreview.vue"
import {useLinkMetaData} from "~~/layers/bookmark/app/composables/useLinkPreview"
import {useUser} from "~~/layers/user/app/composables/useUser"
import {useBookmarksStore} from "~~/layers/bookmark/app/stores/bookmarks"
import {ref} from "vue"
import type {FormState} from "~~/layers/form/app/components/global/DynamicForm.vue"
import type {Response as BookmarkResponse} from "~~/layers/bookmark/server/api/bookmark.post"
import {resetFormState} from "~/utils/resetFormState"

const schema = computed(() => getFormSchema("bookmark", "bookmark"))

type BookmarkState = {
  link: string
}

const state = ref<BookmarkState>({
  link: ""
})

const resetState = resetFormState<BookmarkState>(state, () => ({
  link: ""
}))

const isModalOpen = ref(false)
const {metadata, fetchMetaData} = useLinkMetaData()

const user = useUser()
const {fetchBookmarks} = useBookmarksStore()

const toast = useToast()

const handleCreateBookmark = async (state: FormState) => {
  try {
    await $fetch<BookmarkResponse>('/api/bookmark', {
      method: 'POST',
      body: {
        ...state,
        title: metadata.value.title,
        description: metadata.value.description,
        preview: metadata.value.preview,
        user: user.value.documentId
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

watch(
    () => state.value.link,
    (link) => {
      if (!link) return
      fetchMetaData(link)
    },
)
</script>

<style scoped>

</style>