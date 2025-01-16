"use server"

import axios from "axios"
import { Teacher, UserCreateProps } from "@/types/types";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createUser(data:UserCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/parents'
   try {
   
    const response = await api.post("/register",data);
    // revalidatePath("/dashboard/users/teachers");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create User";
        throw new Error(message);
    }
    throw error;
   }
}

export async function getProfileId(userId:string, role:string) {
     try {
        const response = await api.get(`/users/${userId}?role=${role}`);
        const profileData = response.data
        return profileData.id as string;
    } catch (error) {
        console.log(error)
    }
}
