import { auth } from "@/auth"
import {
    Button, DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuShortcut, DropdownMenuTrigger
} from "@circulate/ui"
import {
    BriefcaseBusiness,
    LifeBuoy,
    Podcast,
    Settings,
    User
} from "lucide-react"
import Image from "next/image"
import { FC } from "react"
import LogoutForm from "./LogoutForm"
interface ProfileDropdownProps {
}
const ProfileDropdown: FC<ProfileDropdownProps> = async ({ }) => {
    const session = await auth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="!ring-0 flex items-center justify-center" size={"icon"}>
                      {
                         session?.user.image  ?  <Image src={session?.user.image} alt="" width={40} height={40}/> : <span>{session?.user.name?.toString().slice(0,2).toUpperCase()}</span>
                      }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border border-border">
                <div className="">
                    <DropdownMenuLabel className="pb-0 text-sm">{session?.user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs pt-0.5 font-normal">{session?.user.email}</DropdownMenuLabel>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BriefcaseBusiness />
                        <span>Workspace</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Podcast />
                    <span>Plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="">
                   <LogoutForm/>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown
