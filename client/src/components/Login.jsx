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
import { loginUser } from "@/services/user"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
export default function Login () {

    const [ user, setUser ] = useState( { email: "", password: "" } )
    const navigate = useNavigate();

    function handleChange ( e ) {
        let name = e.target.name;
        let value = e.target.value;
        setUser( { ...user, [ name ]: value } )
        console.log( user )
    }

    async function handleLogin ( e ) {

        e.preventDefault();
        if ( !user.email || !user.password ) {
            toast.error( "All fields are required" );
            return;
        }

        try {
            let { token } = await loginUser( user );
            localStorage.setItem( "token", token )
            setUser( { email: "", password: "" } )
            toast.success( "User logged in successfully" )
            setTimeout( () => {
                navigate( "/" )
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
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                            Enter valid credentials to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={ handleLogin }>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={ user.email }
                                            onChange={ handleChange }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input value={ user.password } onChange={ handleChange } name="password" id="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{ " " }
                                    <Link to="/register" className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{ " " }
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    )
}