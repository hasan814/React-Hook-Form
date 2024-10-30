import { useQuery } from "react-query";
import { Option } from "../../types/option";

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

