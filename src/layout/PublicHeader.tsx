import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useNavigate } from "@tanstack/react-router"; // 1. Import TanStack Router
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicNavItemTypes } from "@/data/types/nav_types";
import { PUBLIC_NAV_ITEMS } from "@/data/const/public_nav";
import { useAuthStore } from "@/data/store/auth_store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react";
import { useLogout } from "@/hooks/api/use-auth";
import { speak } from "@/lib/speech";
import { ROLE_STUDENT, ROLE_TEACHER } from "@/data/enums/roles";
import { useRegisterCommands } from "@/hooks/use-register-command";

export default function PublicHeader() {
  
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isFloating = useRef(false);
  const { isAuthenticated, user, role } = useAuthStore()
  const isMobile = useIsMobile()
  const { trigger } = useLogout()
  const navigate = useNavigate()

  useEffect(() => console.log({user}), [user])

  const filteredNavItems = useMemo(() => {
    return PUBLIC_NAV_ITEMS.filter(i => !i.hasAccess || i.hasAccess.some(r => r === role))
  }, [role])

  const dynamicCommands = useMemo(() => {
    const cmds = []

    if(!isAuthenticated) cmds.push({
      pattern: /^buka login$/i,
      description: "Masuk ke halaman login",
      action: () => {
        speak("Membuka halaman login");
        navigate({ to: '/login' });
      }
    })
    else if(role === ROLE_STUDENT) {
      cmds.push({
        pattern: /^buka kelas$/i,
        description: "Membuka daftar kelas",
        action: () => {
          speak("Membuka halaman kelas Anda");
          navigate({ to: '/classes' });
        }
      })
      cmds.push({
        pattern: /^buka tugas$/i,
        description: "Membuka daftar tugas",
        action: () => {
          speak("Membuka halaman tugas Anda");
          navigate({ to: '/assignments' });
        }
      })
    }
    else if(role === ROLE_TEACHER) cmds.push({
      pattern: /^buka dashboard$/i,
      description: "Membuka dashboard",
      action: () => {
        speak("Membuka halaman dashboard");
        navigate({ to: '/teacher' });
      }
    })

    return cmds
  }, [isAuthenticated, user, navigate, speak, trigger])

  useRegisterCommands(dynamicCommands)

  useGSAP(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 10;

      if (scrollY > threshold && !isFloating.current) {
        isFloating.current = true;
        gsap.to(navRef.current, {
            duration: 0.5,
            ease: "power3.out",
            top: 20,
            width: "95%",
            maxWidth: "1200px",
            borderRadius: "0.625rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        });
      } else if (scrollY <= threshold && isFloating.current) {
        isFloating.current = false;
        gsap.to(navRef.current, {
            duration: 0.4,
            ease: "power2.inOut",
            top: 0,
            width: "100%",
            maxWidth: "100%",
            borderRadius: 0,
            backgroundColor: "rgba(255, 255, 255, 255)",
            backdropFilter: "blur(0px)",
            border: "1px solid transparent",
            boxShadow: "none",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <nav ref={navRef} className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full py-4 border border-transparent bg-white">
        <div className="w-full h-full px-6 md:px-8 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer select-none">
            <img src="/favicon.ico" className="h-8" alt="" />
            <span className="text-xl font-bold tracking-tight text-foreground">{import.meta.env.VITE_APP_NAME}</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => (
              <UnifiedNavItem key={item.name} item={item} />
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {!isAuthenticated && <div className="hidden md:flex gap-1">
              <Link to="/login"><Button className="rounded-full px-6" variant="outline">Masuk</Button></Link>
              <Link to="/register"><Button className="rounded-full px-6">Daftar</Button></Link>
            </div>}
            {isAuthenticated && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full bg-primary text-white">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full bg-primary text-white">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconNotification />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => trigger()}>
                <IconLogout />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
              </DropdownMenu>}
            <button className="md:hidden p-1 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-28 px-6 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-4">
            {filteredNavItems.map((item) => (
              <UnifiedNavItem key={item.name} item={item} isMobile />
            ))}
            <div className="pt-4 mt-4 border-t flex justify-stretch gap-1">
              <Link to="/login" className="w-full"><Button className="w-full rounded-full" size="lg" variant="outline">Masuk</Button></Link>
              <Link to="/register" className="w-full"><Button className="w-full rounded-full" size="lg">Daftar</Button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UnifiedNavItem({ 
  item, 
  isMobile = false 
}: { 
  item: PublicNavItemTypes; 
  isMobile?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChild = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChild && isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  const Component = hasChild ? "div" : Link;
  
  const extraProps = hasChild 
    ? { onClick: handleClick, role: "button" } 
    : { to: item.to };

  return (
    <div
      className={cn(
        "relative group",
        isMobile ? "border-b border-border/40 pb-3" : "h-full flex items-center"
      )}
    >
      {/* @ts-ignore - Ignore TS error karena prop 'to' dinamis */}
      <Component
        {...extraProps}
        className={cn(
          "flex items-center justify-between font-medium transition-colors select-none",
          isMobile && "text-lg py-2 w-full",
          !isMobile && "text-sm text-muted-foreground hover:text-primary-600",
          !isMobile && hasChild && "cursor-default hover:text-foreground",
          hasChild && isOpen && isMobile && "text-primary-600"
        )}
      >
        {item.name}

        {hasChild && isMobile && (
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200 ml-1",
              isOpen && "rotate-180"
            )}
          />
        )}
      </Component>

      {hasChild && (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            !isMobile && [
              "absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48",
              "opacity-0 invisible -translate-y-2",
              "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
            ],
            isMobile && [
              "overflow-hidden",
              isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
            ]
          )}
        >
          <div
            className={cn(
              !isMobile && "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2 flex flex-col gap-1",
              isMobile && "flex flex-col gap-3 pl-4 border-l-2 border-primary-500/20"
            )}
          >
            {item.children!.map((child) => (
              <Link
                key={child.name}
                to={child.to}
                className={cn(
                  "block transition-colors",
                  !isMobile && "px-4 py-2 text-sm text-center rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 text-foreground",
                  isMobile && "text-muted-foreground hover:text-primary-600"
                )}
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}