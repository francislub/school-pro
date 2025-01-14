"use server"

import axios from "axios"
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { Parent, Teacher, TeacherCreateProps } from "@/types/types";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createTeacher(data:TeacherCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/parents'
   try {
   
    const response = await api.post("/teachers",data);
    // console.log("response", response)
    revalidatePath("/dashboard/users/teachers");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create Teacher";
        throw new Error(message);
    }
    throw error;
   }
}

export async function deleteTeacher(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllTeachers() {
    try {
        const response = await api.get("/teachers");
        const teachers = response.data
        return teachers as Teacher[];
    } catch (error) {
        console.log(error)
    }
}