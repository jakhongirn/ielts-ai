"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/Dashboard/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/dashboard";
import { Dispatch, SetStateAction } from "react";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
    const path = usePathname();

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

    if (!items?.length) {
        return null;
    }

    return (
        <>
            <nav className="grid items-start gap-4">
                {items.map((item, index) => {
                    const Icon = Icons[item.icon || "arrowRight"];
                    return (
                        item.href && (
                            <Link
                                key={index}
                                href={item.disabled ? "/" : item.href}
                                onClick={() => {
                                    if (setOpen) setOpen(false);
                                }}
                                
                            >
                                <span
                                    className={cn(
                                        "group flex items-center rounded-xl px-3 py-2 font-medium text-lg hover:bg-blue-400 duration-300 hover:text-white",
                                        path === item.href
                                            ? "bg-blue-400 text-white"
                                            : "transparent text-black",
                                        item.disabled &&
                                            "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    <Icon className="mr-2 h-6 w-6" />
                                    <span>{item.title}</span>
                                </span>
                            </Link>
                        )
                    );
                })}
            </nav>
            <button  className="absolute w-11/12 bottom-2 left-2 hover:bg-blue-400 rounded-xl hover:text-white hover:duration-300" onClick={handleLogout}>
                <span
                    className={cn(
                        "group flex items-center rounded-md px-3 py-2 font-medium text-lg hover:bg-accent hover:text-accent-foreground",
                        
                    )}
                >
                    <LogOut className="mr-2 h-6 w-6" />
                    <span>Log out</span>
                </span>
            </button>
        </>
    );
}
