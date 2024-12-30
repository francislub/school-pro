import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/types';
import { logout } from '@/actions/auth';


export interface SessionData {
    user: User;
    accassToken: string;
    refreshToken: string;

}

interface UserSessionStore {
    user: User | null;
    setUser: (userData: User) => Promise<void>;
    clearSession: () => Promise<void>;
}



export const useUserSession = create<UserSessionStore>()(
    persist (
        (set) => ({
            user: null,

            setUser: async (userData) => {
                try {
                    set({user: userData});
                } catch (error) {
                    console.log("Session creation error:", error)
                }
            },


            clearSession: async () => {
                try {
                    const result = await logout();

                    if (result.success) {
                        set({ user: null })
                    } else {
                        throw new Error ("Logout failed");
                    }
                } catch (error) {
                    console.error("Logout error:", error);
                }
            },
        }),
        {
            name: "user-session",
            partialize: (state) => ({ user: state.user }),
        }
    )
);