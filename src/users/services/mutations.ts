
import { useMutation, useQueryClient } from "react-query"
import { Schema } from "zod"

import axios from "axios"


export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: Schema) => {
            await axios.post('http://localhost:8080/users', data)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [''] })
        }
    })
}