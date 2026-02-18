import { ref } from 'vue'

export function useResettableFormState<T>(factory: () => T) {
    const state = ref<T>(factory())

    const resetState = () => {
        state.value = factory()
    }

    return { state, resetState }
}