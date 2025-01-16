"use server"

import axios from "axios"
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { Parent } from "@/types/types";
import { revalidatePath } from "next/cache";
import { BriefStudent } from "@/components/portal/parents/StudentList";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createParents(data:ParentProps){
    // const endpoint = '${BASE_API_URL}/v1/parents'
   try {
   
    const response = await api.post("/parents",data);
    revalidatePath("/dashboard/users/parents");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create Parent";
        throw new Error(message);
    }
    throw error;
   }
}

export async function deleteParent(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllParents(schoolId:string) {
    try {
        const response = await api.get(`/parents/school/${schoolId}`);
        const parents = response.data
        return parents as Parent[];
    } catch (error) {
        console.log(error)
    }
}
export async function getStudentsByParentId(parentId:string) {
    try {
        const response = await api.get(`/students/parent/${parentId}`);
        const students = response.data
        return students as BriefStudent[];
    } catch (error) {
        console.log(error)
    }
}