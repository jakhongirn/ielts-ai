// hooks/useAuthProtected.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // Assuming you have a useAuth hook
import { set } from 'react-hook-form';

const useAuthProtected = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = window.sessionStorage.getItem('token');
        setIsAuthenticated(!!token);
        if (!token) {
            // Redirect them to the login page
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated;
};

export default useAuthProtected;
