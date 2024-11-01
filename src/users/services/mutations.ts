
import { useMutation, useQueryClient } from "react-query"
import { Schema } from "zod"

import axios from "axios"
import toast from 'react-hot-toast'


export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: Schema) => {
            await axios.post('https://hook-server.vercel.app/users', data)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('User Created!')
        }
    })
}