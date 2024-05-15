'use client';

import useSWR from "swr";
import { fetcher } from "@/app/api/auth/fetcher";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";  

function Profile() {

    const router = useRouter();

    const { data: user } = useSWR("/auth/users/me", fetcher);

    const { logout, removeTokens } = AuthActions();

    const handleLogout = () => {
        logout()
            .res(() => {
                removeTokens();

                router.push("/");
            })
            .catch(() => {
                removeTokens();
                router.push("/");
            });
    };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
          </div>
          <div className="h-screen rounded-lg border w-full bg-gray-100">

            <div>
              <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
              <div>
                <p className="text-lg font-semibold">Name: {user?.name}</p>
                <p className="text-lg font-semibold">Email: {user?.email}</p>
              </div>
            </div>

          </div>
         
       
        </div>  
        )
}

export default Profile;