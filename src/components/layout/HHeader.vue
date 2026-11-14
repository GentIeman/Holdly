<template>
  <header class="header">
    <HButton
      class="brand"
      variant="link"
      label="Clip It"
      to="/"
    />
    <nav class="navigation">
      <ul class="navigation-list">
        <li
          v-for="item in navigationMenuItems"
          :key="item.label"
        >
          <HButton
            :to="item.to"
            :label="item.label"
            :icon="item.icon"
            variant="soft"
            color="neutral"
          />
        </li>
      </ul>
    </nav>
    <HContainer class="header-actions">
      <HContainer
        v-if="bookmarkLength > 0"
        class="add-bookmark"
      >
        <AddBookmarkModal />
      </HContainer>
      <HDropdownMenu :items="dropDownMenuItems">
        <template #activator="{ attrs }">
          <HButton
            v-bind="attrs"
            type="button"
            variant="outline"
            color="neutral"
            icon="tabler-user"
            aria-label="Account"
          />
        </template>
      </HDropdownMenu>
    </HContainer>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import type { HDropdownMenuItem } from "@/components/ui/HDropdownMenu.vue"
import HContainer from "@/components/ui/HContainer.vue"
import HButton from "@/components/ui/HButton.vue"
import HDropdownMenu from "@/components/ui/HDropdownMenu.vue"
import AddBookmarkModal from "@/features/bookmark/components/AddBookmarkModal.vue"
import { useBookmarkStore } from "@/features/bookmark/stores/bookmark"

const { bookmarkLength } = storeToRefs(useBookmarkStore())

const navigationMenuItems = [
  {
    label: "Bookmarks",
    icon: "tabler-bookmark",
    to: "/bookmarks"
  }
  // {
  //   label: "Collections",
  //   icon: "tabler-folders"
  // }
]

const dropDownMenuItems: HDropdownMenuItem[][] = [
  [
    {
      label: "Profile",
      icon: "tabler-user"
    }
  ],
  [
    {
      label: "Logout",
      icon: "tabler-logout"
    }
  ]
]
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 10px;
  width: 100%;
  max-width: var(--container-xl);
  margin: auto;
  padding: var(--spacing-lg);

  .brand {
    justify-self: start;
    font-size: var(--font-size-lg);
  }

  .navigation {
    display: flex;
    justify-self: center;

    .navigation-list {
      display: flex;
      gap: var(--spacing-3xl);
    }
  }

  .header-actions {
    display: flex;
    justify-self: end;
    gap: 10px;
  }
}

.add-bookmark {
  display: none;

  @media (width >= 640px) {
    display: inline-flex;
  }
}
</style>