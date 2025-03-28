import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTodo } from "@/services/todo"
import toast from "react-hot-toast"
import { Textarea } from "./ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function AddTodo () {

    const [ todo, setTodo ] = useState( { title: "", description: "", status: "pending", priority: "low" } )
    function handleChange ( e ) {
        console.log( e.target.name )
        let name = e.target.name;
        let value = e.target.value;
        setTodo( { ...todo, [ name ]: value } )
    }

    async function handleSubmit ( e ) {
        e.preventDefault();

        try {
            const responose = await createTodo( todo )
            setTodo( { title: "", description: "", status: "pending", priority: "low" } )
            toast.success( "Todo created successfully" )
        } catch ( error ) {
            toast.error( error.message )
        }

    }

    return (
        <div className="flex justify-center my-8 px-2">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="text-xl">Add Task</CardTitle>
                    <CardDescription>add your new task in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ handleSubmit }>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Task title</Label>
                                <Input name="title" onChange={ handleChange } value={ todo.title ?? "" } id="title" placeholder="Name of your task" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Task description</Label>
                                <Textarea name="description" value={ todo.description ?? "" } onChange={ handleChange } id="description" placeholder="Enter task description" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Select id="priority" onValueChange={ ( val ) => setTodo( { ...todo, priority: val } ) } name="priority" value={ todo.priority }>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Select onValueChange={ ( val ) => setTodo( { ...todo, status: val } ) } name="status" id="status" value={ todo.status }>
                                    <SelectTrigger className={ "w-full" }>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <Button className={ "mt-4" } type="submit">Add Task</Button>
                    </form>
                </CardContent>
                {/* <CardFooter className="flex justify-between">

                </CardFooter> */}
            </Card>
        </div>
    )
}
