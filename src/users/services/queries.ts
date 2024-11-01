import { useQuery } from "react-query";
import { Option } from "../../types/option";
import { ApiGet } from "../types/apiType";
import { Schema } from "../types/schema";

import axios from 'axios'

export const useStates = () => {
    return useQuery({
        queryKey: ['states'],
        queryFn: () => axios.get<Option[]>('https://hook-server.vercel.app/states').then((response) => response.data)
    })
}

export const useLanguages = () => {
    return useQuery({
        queryKey: ['languages'],
        queryFn: () => axios.get<Option[]>('https://hook-server.vercel.app/languages').then((response) => response.data)
    })
}

export const useGenders = () => {
    return useQuery({
        queryKey: ['genders'],
        queryFn: () => axios.get<Option[]>('https://hook-server.vercel.app/languages').then((response) => response.data)
    })
}

export const useSkills = () => {
    return useQuery({
        queryKey: ['skills'],
        queryFn: () => axios.get<Option[]>('https://hook-server.vercel.app/skills').then((response) => response.data)
    })
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: (): Promise<Option[]> => axios.get<ApiGet[]>('https://hook-server.vercel.app/users')
            .then((response) => response.data.map((user) => ({ id: user.id, label: user.name } satisfies Option)))
    })
}

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ['user', { id }],
        queryFn: async (): Promise<Schema> => {
            const { data } = await axios.get<ApiGet>(`https://hook-server.vercel.app/users/${id}`)
            return {
                variant: 'edit',
                id: data.id,
                name: data.name,
                email: data.email,
                formerEmploymentPeriod: [
                    new Date(data.formerEmploymentPeriod[0]),
                    new Date(data.formerEmploymentPeriod[1])
                ],
                states: data.states,
                gender: data.gender,
                skills: data.skills,
                students: data.students,
                isTeacher: data.isTeacher,
                languagesSpoken: data.languagesSpoken,
                salaryRange: [data.salaryRange[0], data.salaryRange[1]],
                registerationDateAndTime: new Date(data.registrationDateAndTime),
            }
        }
    })
}




