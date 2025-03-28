import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteTodo } from "@/services/todo"
import toast from "react-hot-toast";

export default function DeleteTodoButton ( { id, fetchTodos } ) {

    async function handleContinue () {
        try {
            await deleteTodo( id );
            toast.success( "Task deleted successfully" );
            fetchTodos();
        } catch ( error ) {
            console.log( "Error occured while deleting the todo: ", error )
            toast.error( error.message )
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={ "sm" } className={ "cursor-pointer mx-1" } variant={ "destructive" }>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        task and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={ handleContinue }>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
