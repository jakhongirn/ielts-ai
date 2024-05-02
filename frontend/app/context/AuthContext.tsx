import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axios from "axios";
interface User {
    username: string;  // Example property, add more based on your user object structure
    email: string;
    first_name: string;
    
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = window.sessionStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserDetails(); // Fetch user details on initial load
        }
      }, []);
    
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/user/`);
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/login/`,
                { email, password }
            );
            const { access } = response.data;
            window.sessionStorage.setItem('token', access)
            await fetchUserDetails();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        window.sessionStorage.removeItem('token')
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};