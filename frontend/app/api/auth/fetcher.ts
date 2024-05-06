import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "./utils";

const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
    return wretch(`${process.env.NEXT_PUBLIC_API}`)
        .auth(`Bearer ${getToken("access")}`)
        .catcher(401, async (error: WretchError, request: Wretch) => {
            try {
                const { access } = (await handleJWTRefresh().json()) as {
                    access: string;
                };
                console.log(access);
                storeToken(access, "access");
                // Replay the original request with the new access token.

                return request
                    .auth(`Bearer ${getToken("access")}`)
                    .fetch()
                    .unauthorized((error: WretchError) => {
                        console.error(error);
                        // Handle the error
                    })
                    .json();
            } catch (err) {
                console.log(err);
            }
        });
};

export const fetcher = (url: string): Promise<any> => {
    return api().get(url).json();
};
