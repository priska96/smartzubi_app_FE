import { User } from '@/app/api/models';
import { LoginReqData } from '@/app/api/types';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export const AuthContext = createContext<{
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    login: (data: LoginReqData) => Promise<void>;
    logout: () => Promise<void>;
}>({
    user: null,
    setUser: () => {},
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);
