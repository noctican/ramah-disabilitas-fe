import { useAuthStore } from "@/data/store/auth_store"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react"
import { useLogout } from "@/hooks/api/use-auth"

type Props = {
    side?: "bottom"|"top"|"left"|"right";
    align?: "start"|"end"|"center";
}

export const UserDropdownContent = ({ side="bottom", align="end" }: Props) => {
    const { user } = useAuthStore()
    const { trigger } = useLogout()

    return (
        <DropdownMenuContent
            className="w-72 rounded-2xl p-2"
            side={side}
            align={align}
            sideOffset={10}
        >
            <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-full border border-border/50">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate font-semibold text-sm">{user.name}</span>
                        <span className="text-muted-foreground truncate text-xs">
                            {user.email}
                        </span>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem 
                onClick={() => trigger()}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/20 dark:focus:text-red-400"
            >
                <IconLogout className="w-5 h-5" />
                <span className="ml-2.5">Keluar Aplikasi</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}