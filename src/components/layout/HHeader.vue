<template>
  <header class="header">
    <HButton
      class="brand"
      variant="link"
      label="Clip It"
      to="/"
    />
    <HContainer class="header-navigation">
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
      <HContainer class="add-bookmark">
        <AddBookmarkModal />
      </HContainer>
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
  </header>
</template>

<script setup lang="ts">
import type { HDropdownMenuItem } from "@/components/ui/HDropdownMenu.vue"
import HContainer from "@/components/ui/HContainer.vue"
import HButton from "@/components/ui/HButton.vue"
import HDropdownMenu from "@/components/ui/HDropdownMenu.vue"
import AddBookmarkModal from "@/features/bookmark/components/AddBookmarkModal.vue"

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
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: var(--container-xl);
  margin: auto;
  padding: var(--spacing-lg);

  .header-navigation {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .brand {
    font-size: var(--font-size-lg);
  }

  .navigation {
    display: flex;
    flex: 1;
    justify-content: center;

    .navigation-list {
      display: flex;
      align-items: center;
      gap: var(--spacing-3xl);
      list-style: none;
    }
  }
}

.add-bookmark {
  display: none;
}

@media (min-width: 640px) {
  .add-bookmark {
    display: inline-flex;
  }
}
</style>