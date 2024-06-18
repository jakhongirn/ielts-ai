"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSWR from "swr";
import { fetcher } from "@/app/api/auth/fetcher";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import { CircleUser } from "lucide-react";
import Link from "next/link";

export function UserNav() {
    const { data: user } = useSWR("/auth/user/", fetcher);
    const router = useRouter();
    const { logout, removeTokens } = AuthActions();
    const handleLogout = () => {
        logout()
            .res(() => {
                removeTokens();
                router.push("/");
                window.location.reload();
            })
            .catch(() => {
                removeTokens();
                router.push("/");
                window.location.reload();
            });
    };

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <CircleUser className="h-8 w-8" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user?.user.username}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="/dashboard/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link href="/dashboard/transactions">Transactions</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}
