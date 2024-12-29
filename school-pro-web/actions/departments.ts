"use server"

import axios from "axios"
import { Class, ClassCreateProps, Department, DepartmentBrief, StreamCreateProps } from "@/types/types";
import { Stream } from "stream";
import { DepartmentCreateProps } from "../../school-pro-api/src/types/types";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createDepartment(data:DepartmentCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/contacts'
   try {
   
    const response = await api.post("/departments",data);
    revalidatePath("/dashboard/academics/departments");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create department";
        throw new Error(message);
    }
    throw error;
   }
}

export async function deleteDepartment(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllDepartments() {
    try {
        const response = await api.get("/departments");
        const departments = response.data
        return departments as Department[];
    } catch (error) {
        console.log(error)
    }
}

export async function getBriefDepartments() {
    try {
        const response = await api.get("/departments/brief");
        const departments = response.data
        return departments as DepartmentBrief[];
    } catch (error) {
        console.log(error)
    }
}