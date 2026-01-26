import type {ShallowRef} from "@vue/reactivity";
import {useState} from "#imports";

export type User = {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    documentId: string
    email: string
    id: number
    provider: string
    publishedAt: string
    updatedAt: string
    username: string
}

export const useUser = (): ShallowRef => useState<User>('user')