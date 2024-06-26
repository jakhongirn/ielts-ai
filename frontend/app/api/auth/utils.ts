import wretch from "wretch";
import Cookies from "js-cookie";

// Base API setup
const api = wretch(`${process.env.NEXT_PUBLIC_API}`).accept("application/json");

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

const register = (email: string,  username: string, password: string,) => {
    return api.post({ email, username, password }, "/auth/users/");
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
        removeTokens,
    };
};
