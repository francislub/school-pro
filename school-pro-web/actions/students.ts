"use server"

import axios from "axios"
import { Student } from "@/types/types";
import { StudentProps } from "@/components/dashboard/forms/students/student-form";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createStudents(data:StudentProps){
    // const endpoint = '${BASE_API_URL}/v1/parents'
   try {
   
    const response = await api.post("/students", data);
    revalidatePath("/dashboard/students");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create Student";
        throw new Error(message);
    }
    throw new Error("An unknown error occurred: " + (error as Error).message);
   }
}

export async function deleteStudent(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllStudents() {
    try {
        const response = await api.get("/students");
        const students = response.data
        return students as Student[];
    } catch (error) {
        console.log(error)
    }
}
export async function getAllStudentNextSequence() {
    try {
        const response = await api.get("/students/seq");
        const nextSeq = response.data
        return nextSeq as number;
    } catch (error) {
        console.log(error)
    }
}