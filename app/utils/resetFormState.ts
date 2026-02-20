import type { Ref } from 'vue'

export function resetFormState<T>(state: Ref<T>, factory: () => T) {
    return () => {
        state.value = factory()
    }
}