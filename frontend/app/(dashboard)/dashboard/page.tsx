"use client";

import { fetcher } from "@/app/api/auth/fetcher";
import Dashboard from "@/components/Dashboard/Dashboard";
import useSWR from "swr";

export default function DashboardPage() {
  const { data: user } = useSWR("/auth/user/", fetcher);
    
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className=" rounded-lg border w-full p-4 bg-gray-100">
        <Dashboard user={user}/>
      </div>
     
    </div>  
    );
}
