"use client";

import useSWR from "swr";
import { fetcher } from "@/app/api/auth/fetcher";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AvatarProfile from "@/components/Dashboard/Avatar";
import { Button } from "@/components/ui/button"


function Profile() {
    const router = useRouter();

    const { data: user } = useSWR("/auth/users/me", fetcher);

    if (!user) return <p>No user information available</p>;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
            </div>

           <div className="rounded-lg border w-full bg-gray-100 p-4">

           <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4"></h2>
                <div className="border-b border-gray-200">
                    <Tabs.Root defaultValue="info">
                        <Tabs.List
                            aria-label="User information tabs"
                            className="flex space-x-1"
                        >
                            <Tabs.Trigger
                                value="info"
                                className="py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                            >
                                Info
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="settings"
                                className="py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                            >
                                Settings
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="info" className="mt-4">
                            <div className="space-y-3 pb-4">
                              <div className="flex items-center gap-x-4 p-2">
                                <AvatarProfile />
                                <div>
                                <Button variant="outline">Update</Button>


                                </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <InfoCircledIcon />
                                    <span className="text-lg text-gray-600">
                                        <span className="font-medium">Email:</span> {user.email}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <InfoCircledIcon />
                                    <span className="text-lg text-gray-600">
                                    <span className="font-medium">Username:</span> {user.username}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <InfoCircledIcon />
                                    <span className="text-lg text-gray-600">
                                    <span className="font-medium">Name:</span> {user.username}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <InfoCircledIcon />
                                    <span className="text-lg text-gray-600">
                                    <span className="font-medium">Phone number:</span> {user.phone_number || "N/A"}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <InfoCircledIcon />
                                    <span className="text-lg text-gray-600">
                                    <span className="font-medium">Joined at:</span> {user.created_at || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                <Button variant="outline">Edit profile</Button>
                                </div>
                                
                            </div>
                        </Tabs.Content>
                        <Tabs.Content value="settings" className="mt-4">
                            <p className="text-sm text-gray-600">
                                Settings will be available soon.
                            </p>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </div>
           </div>
        </div>
    );
}

export default Profile;
