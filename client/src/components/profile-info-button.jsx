import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'


const ProfileInfoButton = ( { user } ) => {

    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem( "token" )
        navigate( "/login" )
    }
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Profile</DialogTitle>
                        <DialogDescription>
                            See all your profile details here
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Id
                            </Label>
                            <p className="col-span-3">
                                { user.id }
                            </p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <p className="col-span-3">
                                { user.name }
                            </p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Email
                            </Label>
                            <p className="col-span-3">
                                { user.email }
                            </p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Gender
                            </Label>
                            <p className="col-span-3">
                                { user.gender }
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="cursor-pointer" type="button" variant={ "destructive" } onClick={ handleLogout }>Logout</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileInfoButton
