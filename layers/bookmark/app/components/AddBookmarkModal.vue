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
            :validation-schema="bookmarkSchema"/>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {bookmarkSchema} from "~~/layers/bookmark/validators/bookmarkRules"
import DynamicForm from "~~/layers/form/app/components/global/DynamicForm.vue";
import LinkPreview from "~~/layers/bookmark/app/components/LinkPreview.vue";
import {useLinkPreview} from "~~/layers/bookmark/app/composables/useLinkPreview"
import {shallowReactive} from "vue"
import {useResettableFormState} from "~~/layers/form/app/composables/useResettableFormState"
import {useLinkMetaData} from "~~/layers/bookmark/app/composables/useLinkPreview"
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