import { patterns } from '../../constants'
import { z } from 'zod'

export const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Email is required" }).refine((text) => { return patterns.email.test(text), { message: "Email not Valid" } }),
    states: z.array(z.string()).min(1).max(2),
    languagesSpoken: z.array(z.string()),
    gender: z.string().min(1)
})


export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
    email: "",
    name: "",
    states: [],
    gender: "",
    languagesSpoken: []
}