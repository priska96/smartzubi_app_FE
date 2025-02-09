import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginResData } from '@/app/api/types';
import { User } from '@/app/api/models';

export type AuthState = {
    auth?: LoginResData;
    setAuth: (auth: LoginResData | undefined) => void;
    setAuthUser: (auth: User | undefined) => void;
};

export const isPaying = (state: AuthState) => state.auth?.user?.is_paying;

export const isLocked = (state: AuthState) => state.auth?.user?.locked;

// export const isAdmin = (state: AuthState) => {
//     if (state.auth?.auth?.permissions?.isOrgAdmin) {
//         return true;
//     }

//     let isAdmin = false;
//     state.auth?.auth?.roles?.forEach((role) => {
//         if (role.name === ROLE_NAME_ADMIN) {
//             isAdmin = true;
//         }
//     });

//     return isAdmin;
// };

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            auth: undefined,
            setAuth: (auth: LoginResData | undefined) =>
                set((state) => ({ ...state, auth })),
            setAuthUser: (authUser: User | undefined) =>
                set((state) => ({
                    ...state,
                    auth: {
                        user: authUser,
                    },
                })),
        }),
        {
            name: 'smartzubi.auth',
        }
    )
);
