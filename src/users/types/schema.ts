import { patterns } from '../../constants'
import { z } from 'zod'

export const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Email is required" }).refine((text) => { return patterns.email.test(text), { message: "Email not Valid" } })
})

