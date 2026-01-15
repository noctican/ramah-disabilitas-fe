import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { useMemo } from "react"
import { useAuthStore } from "@/data/store/auth_store"
import { DASHBOARD_NAV_ITEMS } from "@/data/const/dashboard_nav"

export function NavMain() {
  const { role } = useAuthStore()
  const filteredNavItems = useMemo(() => {
    return DASHBOARD_NAV_ITEMS.filter(i => !i.hasAccess || i.hasAccess.some(r => r === role))
  }, [role])
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton tooltip={item.name} asChild>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === '/teacher' }}
                  activeProps={{
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear min-h-10"
                  }}
                >
                  <item.icon />
                  <span className="text-[.9rem]">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}