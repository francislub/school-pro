"use server"

import { api } from "./schools"
import axios from "axios"
import { PeriodCreateProps } from "@/types/types";
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

// export async function deleteDepartment(id:string) {
//     console.log("deleted",id)
//     return {
//         ok: true
//     };
// }

// export async function getAllDepartments(schoolId:string) {
//     try {
//         const response = await api.get(`/departments/school/${schoolId}`);
//         const departments = response.data
//         return departments as Department[];
//     } catch (error) {
//         console.log(error)
//     }
// }
