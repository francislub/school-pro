"use server"

import axios from "axios"
import { Class, ClassBrief, ClassCreateProps, StreamCreateProps } from "@/types/types";
import { Stream } from "stream";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function createClass(data:ClassCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/contacts'
   try {
   
    const response = await api.post("/classes",data);
    revalidatePath("/dashboard/academics/classes");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create class";
        throw new Error(message);
    }
    throw error;
   }
}
export async function createStream(data:StreamCreateProps){
    // const endpoint = '${BASE_API_URL}/v1/contacts'
   try {
   
    const response = await api.post("/streams",data);
    revalidatePath("/dashboard/academics/classes");
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create stream";
        throw new Error(message);
    }
    throw error;
   }
}

export async function deleteClass(id:string) {
    console.log("deleted",id)
    return {
        ok: true
    };
}

export async function getAllClasses(schoolId: string) {
    try {
        const response = await api.get(`/classes/school/${schoolId}`);
        const classes = response.data;
        return classes as Class[];
    } catch (error) {
        console.log(error)
    }
}

export async function getBriefClasses(schoolId:string) {
    try {
        const response = await api.get(`/classes/brief/${schoolId}`);
        console.log("Response", response)
        const classes = response.data
        return classes as ClassBrief[];
    } catch (error) {
        console.log(error)
    }
}

export async function getAllStreams() {
    try {
        const response = await api.get("/streams");
        const streams = response.data
        return streams as Stream[];
    } catch (error) {
        console.log(error)
    }
}