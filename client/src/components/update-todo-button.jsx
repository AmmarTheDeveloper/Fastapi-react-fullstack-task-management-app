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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateTodo } from "@/services/todo";

const UpdateTodoButton = ( { id, fetchTodos, current_todo } ) => {

    const [ todo, setTodo ] = useState( { title: current_todo.title, description: current_todo.description, priority: current_todo.priority, status: current_todo.status } )

    function handleChange ( e ) {
        let name = e.target.name;
        let value = e.target.value;
        setTodo( { ...todo, [ name ]: value } )
    }

    async function handleSave () {
        if ( !todo.title || !todo.description || !todo.priority || !todo.status ) {
            return toast.error( "All fields are required" )
        }
        try {
            await updateTodo( id, todo )
            toast.success( "Task updated successfully" )
            fetchTodos();
        } catch ( error ) {
            toast.error( error.message )
            console.log( "Error occured while updating task: ", error )
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={ "sm" } className={ "cursor-pointer mx-1" } variant={ "primary" }>Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input name="title" onChange={ handleChange } id="title" value={ todo.title } className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea name="description" onChange={ handleChange } id="description" value={ todo.description } className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select id="priority" onValueChange={ ( val ) => setTodo( { ...todo, priority: val } ) } name="priority" value={ todo.priority }>
                            <SelectTrigger className="w-full col-span-3" >
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select onValueChange={ ( val ) => setTodo( { ...todo, status: val } ) } name="status" id="status" value={ todo.status }>
                            <SelectTrigger className={ "w-full col-span-3" }>
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
                <DialogFooter>
                    <Button className={ "cursor-pointer" } onClick={ handleSave } type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTodoButton
