<template>
  <component :is="layout">
    <RouterView />
  </component>
  <HToastList />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

import HToastList from "@/components/ui/toast/HToastList.vue"
import DefaultLayout from "@/layouts/default.vue"
import SignLayout from "@/layouts/sign.vue"

const layouts = {
  default: DefaultLayout,
  sign: SignLayout
}

const route = useRoute()

const layout = computed(() => layouts[route.meta.layout ?? "default"])
</script>