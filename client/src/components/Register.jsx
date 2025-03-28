import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { registerUser } from "@/services/user"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
export default function Register () {


    const navigate = useNavigate();
    const [ user, setUser ] = useState( { name: "", email: "", password: "", gender: "" } )
    function handleChange ( e ) {
        let name = e.target.name;
        let value = e.target.value;
        setUser( { ...user, [ name ]: value } )
        console.log( user )
    }

    async function handleRegister ( e ) {

        e.preventDefault();
        if ( !user.name || !user.email || !user.password || !user.gender ) {
            toast.error( "All fields are required" );
            return;
        }


        try {
            await registerUser( user );
            setUser( { name: "", email: "", password: "", gender: "" } )
            toast.success( "User registered successfully" )
            setTimeout( () => {
                navigate( "/login" )
            }, 1000 )
        } catch ( error ) {
            toast.error( error.message )
        }

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[400px] max-w-full mx-4 flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Register</CardTitle>
                        <CardDescription>
                            Enter details to create account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={ handleRegister }>
                            <div className="grid gap-6">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            value={ user.name }
                                            onChange={ handleChange }
                                            name="name"
                                            id="name"
                                            type="text"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            value={ user.email }
                                            onChange={ handleChange }
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Gender</Label>
                                        <RadioGroup valuue={ user.gender } onChange={ handleChange } name="gender">
                                            <div className="flex gap-5">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <Label htmlFor="male">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <Label htmlFor="female">Female</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input value={ user.password } onChange={ handleChange } id="password" name="password" type="password" placeholder="Enter password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Register
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{ " " }
                                    <Link to="/login" className="underline underline-offset-4">
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}