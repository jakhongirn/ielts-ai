// hooks/useAuthProtected.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // Assuming you have a useAuth hook

const useAuthProtected = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirect them to the login page
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated;
};

export default useAuthProtected;
