import { patterns } from '../../constants'
import { z } from 'zod'

export const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Email is required" }).refine((text) => { return patterns.email.test(text), { message: "Email not Valid" } }),
    states: z.array(z.string()).min(1).max(2),
    languagesSpoken: z.array(z.string()),
    gender: z.string().min(1),
    skills: z.array(z.string()).max(2, { message: 'test' }),
    registerationDateAndTime: z.date(),
    formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
    isTeacher: z.boolean()
})


export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
    email: "",
    name: "",
    states: [],
    gender: "",
    skills: [],
    isTeacher: true,
    languagesSpoken: [],
    salaryRange: [0, 2000],
    registerationDateAndTime: new Date(),
    formerEmploymentPeriod: [new Date(), new Date()]
}