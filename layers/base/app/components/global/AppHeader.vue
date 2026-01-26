<template>
  <header>
    <UContainer class="flex items-center py-4">
      <UButton
          variant="link"
          label="Clip It"
          size="xl"
          @click="$router.push('/')"/>
      <UContainer class="flex items-center px-0">
        <UNavigationMenu
            :items="navigationMenuItems"
            class="w-full justify-center"/>
<!--        <AddBookmarkModal class="hidden sm:inline-flex"/>-->
      </UContainer>
      <UDropdownMenu
          :items="dropDownMenuItems"
      >
        <UButton
            :avatar="{
                src: 'https://github.com/nuxt.png'
            }"
            size="md"
            color="neutral"
            variant="outline"
        />
      </UDropdownMenu>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
// import AddBookmarkModal from "~/layers/bookmark/components/AddBookmarkModal.vue";

const navigationMenuItems = ref<NavigationMenuItem[]>([
  {
    label: 'Bookmarks',
    icon: 'i-lucide-bookmark',
    to: '/bookmarks',
  },
  {
    label: 'Collections',
    icon: 'i-lucide-folders',
  },
])

const dropDownMenuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
    }
  ]
])
</script>

<style scoped>

</style>