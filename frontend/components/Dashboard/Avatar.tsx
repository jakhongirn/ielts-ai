import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

const AvatarProfile = () => {
    return (
        <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png"  sizes=""/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default AvatarProfile;
