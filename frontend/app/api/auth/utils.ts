import wretch from "wretch";
import Cookies from "js-cookie";

// Define the UserMockTest type



// Base API setup
export const api = wretch(`${process.env.NEXT_PUBLIC_API}`).accept("application/json");

//
const storeToken = (token: string, type: "access" | "refresh") => {
    Cookies.set(type + "Token", token);
};

const getToken = (type: string) => {
    return Cookies.get(type + "Token");
};

const removeTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

//Auth actions

const register = (first_name: string, email: string,  username: string, password: string, password_confirmation: string) => {
    return api
            .post({ first_name, email, username, password, password_confirmation }, "/auth/signup/")
            .res();
};

const login = (email: string, password: string) => {
    return api.post({ email, password }, "/auth/jwt/create");
};

const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh/");
};

const resetPassword = (email: string) => {
    return api.post({ email }, "/auth/users/reset_password");
};

const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
) => {
    return api.post(
        { uid, token, new_password, re_new_password },
        "/auth/users/reset_password_confirm/"
    );
};


export const AuthActions = () => {
    return {
        login,
        resetPasswordConfirm,
        handleJWTRefresh,
        register,
        resetPassword,
        storeToken,
        getToken,
        logout,
        removeTokens
    };
};
