"use server"

import axios from "axios"
import { Department, DepartmentBrief, Subject, SubjectBrief, SubjectCreateProps } from "@/types/types";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createSubject(data:SubjectCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/contacts'
   try {
   
    const response = await api.post("/subjects",data);
    revalidatePath("/dashboard/academics/subjects");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create subject";
        throw new Error(message);
    }
    throw error;
   }
}

export async function deleteSubject(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllSubjects(schoolId: string) {
    try {
        const response = await api.get(`/subjects/school/${schoolId}`);
        const subjects = response.data
        return subjects as Subject[];
    } catch (error) {
        console.log(error)
    }
}

export async function getBriefSubject(schoolId:string) {
    try {
        const response = await api.get(`/subjects/brief/${schoolId}`);
        const subjects = response.data
        return subjects as SubjectBrief[];
    } catch (error) {
        console.log(error)
    }
}