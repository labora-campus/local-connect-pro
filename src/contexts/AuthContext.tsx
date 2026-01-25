import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@/types/crm';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (role: 'admin' | 'distributor' | 'collaborator') => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const storedRole = localStorage.getItem('userRole') as 'admin' | 'distributor' | 'collaborator' | null;
        if (storedRole && mockUsers[storedRole]) {
            setUser(mockUsers[storedRole]);
        }
        setIsLoading(false);
    }, []);

    const login = (role: 'admin' | 'distributor' | 'collaborator') => {
        localStorage.setItem('userRole', role);
        setUser(mockUsers[role]);
    };

    const logout = () => {
        localStorage.removeItem('userRole');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
