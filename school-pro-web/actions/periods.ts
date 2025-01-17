"use server"

import { api } from "./schools"
import axios from "axios"
import { GroupedPeriods, Period, PeriodCreateProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createPeriod(data: PeriodCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/contacts'
   try {
   
    const response = await api.post("/periods",data);
    revalidatePath("/dashboard/academics/terms");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create Period";
        throw new Error(message);
    }
    throw error;
   }
}

export async function getAllPeriods(schoolId:string) {
    try {
        const response = await api.get(`/periods/${schoolId}`);
        const periods = response.data.data;
        return periods as Period[];
    } catch (error) {
        console.log(error)
    }
}
