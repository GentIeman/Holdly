<template>
  <UModal
      title="Save Link"
      description="Paste a link and save it for later"
      :close="{
        color: 'neutral',
    }">
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
            v-if="preview"
            :preview="preview"/>
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

const schema = computed(() => getFormSchema("bookmark", "bookmark"))

const state = shallowReactive({
  link: ""
type BookmarkState = {
  link: string
  user: User["documentId"]
}
const state = shallowReactive<BookmarkState>({
  link: "",
  user: user.value.documentId
})

const {preview, fetchPreview} = useLinkPreview()

watch(() => state.link, async () => {
  await fetchPreview(state.link)
})
</script>

<style scoped>

</style>