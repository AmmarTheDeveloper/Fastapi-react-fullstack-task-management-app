"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { CheckSquare, Menu } from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ProfileInfoButton from "./profile-info-button"

const Navbar = ( { user } ) => {
    const { pathname } = useLocation()
    const [ isOpen, setIsOpen ] = useState( false )

    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem( "token" )
        navigate( "/login" )
    }

    const routes = [
        { href: "/", label: "Home" },
        { href: "/add-task", label: "Add Task" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-[1200px] mx-auto">
                <div className="px-4 flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <CheckSquare className="h-6 w-6 text-primary" />
                        <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Task
                        </span>
                    </Link>

                    {/* Desktop Navigation */ }
                    <nav className="mr-4 hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                { routes.map( ( route ) => (
                                    <NavigationMenuItem key={ route.href }>

                                        <Link className={ cn(
                                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                                            pathname === route.href ? "bg-accent text-accent-foreground" : "text-foreground",
                                        ) } to={ route.href }>
                                            { route.label }
                                        </Link>
                                    </NavigationMenuItem>
                                ) ) }
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ModeToggle />

                        <ProfileInfoButton user={ user } />




                        {/* Mobile Navigation */ }
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" aria-label="Menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="px-4 w-[250px] sm:w-[300px]">
                                <div className="flex flex-col gap-6 py-6">
                                    <Link to="/" className="flex items-center space-x-2" onClick={ () => setIsOpen( false ) }>
                                        <CheckSquare className="h-6 w-6 text-primary" />
                                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                            Task
                                        </span>
                                    </Link>

                                    <nav className="flex flex-col space-y-4">
                                        { routes.map( ( route ) => (
                                            <Link
                                                key={ route.href }
                                                to={ route.href }
                                                onClick={ () => setIsOpen( false ) }
                                                className={ cn(
                                                    "px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                                                    pathname === route.href ? "text-primary font-semibold" : "text-muted-foreground",
                                                ) }
                                            >
                                                { route.label }
                                            </Link>
                                        ) ) }
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

