import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter
} from "vue"
import type { ZodObject } from "zod"

const FORM_SCHEMA_KEY: InjectionKey<ComputedRef<ZodObject | undefined>> = Symbol("form-schema")

export function provideFormSchema(schema: MaybeRefOrGetter<ZodObject | undefined>) {
  provide(
    FORM_SCHEMA_KEY,
    computed(() => toValue(schema))
  )
}

export function useFormSchema(): ComputedRef<ZodObject | undefined> | undefined {
  return inject(FORM_SCHEMA_KEY)
}