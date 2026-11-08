import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter
} from "vue"
import type { InputRootProps } from "@vuetify/v0"
import type { ZodObject } from "zod"

const FORM_SCHEMA_KEY: InjectionKey<ComputedRef<ZodObject | undefined>> = Symbol("form-schema")

export function useFormSchema() {
  const schema = inject(FORM_SCHEMA_KEY, undefined)

  const setSchema = (source: MaybeRefOrGetter<ZodObject | undefined>) => {
    provide(
      FORM_SCHEMA_KEY,
      computed(() => toValue(source))
    )
  }

  const getRules = (name: string): ComputedRef<InputRootProps["rules"]> => {
    return computed(() => {
      const rule = schema?.value?.shape[name]

      return rule ? [rule] : []
    })
  }

  return {
    setSchema,
    getRules
  }
}
