import { createRouter, createWebHistory } from "vue-router"

import { useUserStore } from "@/features/user/stores/user"

declare module "vue-router" {
  interface RouteMeta {
    layout?: "default" | "sign"
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/bookmarks" },
    {
      path: "/bookmarks",
      component: () => import("@/pages/bookmarks.vue"),
      meta: { layout: "default", requiresAuth: true }
    },
    {
      path: "/sign",
      component: () => import("@/pages/sign.vue"),
      meta: { layout: "sign" }
    }
  ]
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const userStore = useUserStore()
  if (userStore.user) return true

  try {
    await userStore.fetchMe()
    return true
  } catch {
    return { path: "/sign" }
  }
})

export default router