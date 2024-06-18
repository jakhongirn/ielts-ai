import ThemeToggle from "@/components/Dashboard/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
            <nav className="h-18 flex items-center justify-between px-4">
                <div className="hidden lg:flex">
                    <Link
                        href="/"
                        passHref
                        className="font-bold flex z-999 items-center"
                    >
                        <Image
                            src="/images/logo/logo.png"
                            alt="logo"
                            width={72}
                            height={40}
                            className="dark:block"
                        /> <p>Prepal AI</p>
                    </Link>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <UserNav />
                    
                </div>
            </nav>
        </div>
    );
}
