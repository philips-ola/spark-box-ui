import { createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { refreshAccessToken } from "#/api/auth";
import { setStoredAccessToken } from "#/lib/authToken";

type User = {
    id: string;
    email: string;
    name: string;
};

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [user, setUser] = useState<AuthContextType['user'] | null>(null);

    // Refresh token on page refresh
    useEffect(() => {
        const loadAuth = async () => {
            try{
                const { accessToken: newToken, user } = await refreshAccessToken();
                setAccessToken(newToken);
                setUser(user);
                setStoredAccessToken(newToken)
            }catch(err: any) {
                console.log('Failed to refresh token', err)
            }
        }
        loadAuth();
    }, []);

    useEffect(() => {
        setStoredAccessToken(accessToken);

    }, [accessToken]);

    return(
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {

const context = useContext(AuthContext);
if(!context) throw new Error('useAuth must be used within a provider');
    return context;

}
