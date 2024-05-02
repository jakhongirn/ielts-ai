import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
        const token = Cookies.get('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          fetchUserDetails(); // Fetch user details on initial load
        }
        
      },[]);
    
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('/api/user');
          setUser(response.data);
          setIsAuthenticated(true);
          console.log(isAuthenticated)
          console.log(user)
        } catch (error) {
          console.error('Error fetching user details:', error);
          Cookies.remove('token');
        }
      };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/login/`,
                { email, password }
            );
            const { access } = response.data;
            Cookies.set("token", access, { expires: 7 }); // Expires in 1 day
            await fetchUserDetails();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        Cookies.remove("token");
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