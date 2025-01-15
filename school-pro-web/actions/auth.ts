"use server";

import { api, getSchoolById } from "./schools";
import { School, User } from "@/types/types";
import { cookies } from "next/headers";

export async function loginUser(data:{ email: string; password: string
}) {
    try {
    const response = await api.post("/login",data);
    const { user, accessToken, refreshToken } = response.data.data;
    console.log(user,accessToken,refreshToken)
    const userData = response.data.data
    await createServerSession(userData);
    const school = await getSchoolById(userData?.user.schoolId);
    await saveServerSchool(school as School);
    return response.data.data as SessionData;

    }catch (error) {
     console.log(error)
    }
}

interface SessionData {
    user: User,
    accessToken: string,
    refreshToken: string,
};

export async function createServerSession(
    data: SessionData
) {

    try {
        const cookieStore = await cookies()

        cookieStore.set("user", JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
        });

        cookieStore.set("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
        });
        cookieStore.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return { success: true };
    } catch (error) {
        console.error("Session create error:", error);
        return { success: false, error: "Invalid session data"};
    }
}

export async function saveServerSchool(
    data: School
) {

    try {
        const cookieStore = await cookies()

        cookieStore.set("school", JSON.stringify(data), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return { success: true };
    } catch (error) {
        console.error("Session create error:", error);
        return { success: false, error: "Invalid session data"};
    }
}

export async function logout() {

    try {
        const cookieStore = await cookies()

        cookieStore.delete("user");
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return { success: true};
    } catch (error){
        console.error("Logout error:" ,error);
        return { success: false, error: "Logout failed"};
    }
}
export async function getServerUser() {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    try {
        const user = JSON.parse(userCookie.value);
        return user as User;
    }catch {
        return null;
    }

}

export async function getServerSchool() {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("school");

    if (!userCookie) return null;

    try {
        const school = JSON.parse(userCookie.value);
        return school as School;
    }catch {
        return null;
    }

}