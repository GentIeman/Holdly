import type {Response as MeResponse} from "~~/layers/user/server/api/me.get"

export const useAuth = () => {
    const user = useUser();
    const toast = useToast()

    const me = async () => {
        const requestFetch = useRequestFetch()
        const response = await requestFetch<MeResponse>('/api/me', {
            async onResponseError() {
                toast.add({
                    title: "Your session may have expired. Please sign in again.",
                    color: "error"
                })
            }
        })

        user.value = response.user
    };

    return {me}
};