"use server"

import axios from "axios"
import { Contact } from "@/types/types";

const BASE_API_URL = process.env.API_URL || "";
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export type Analytics ={
    title: string,
    count: number,
}

export async function getAllAnalytics(schoolId:string) {
    try {
        const response = await api.get(`/analytics/school/${schoolId}`);
        const analytics = response.data
        return analytics as Analytics[];
    } catch (error) {
        console.log(error)
    }
}