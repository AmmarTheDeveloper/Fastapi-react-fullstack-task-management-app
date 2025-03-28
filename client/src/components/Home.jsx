import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { getTodos } from '@/services/todo';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DeleteTodoButton from './delete-todo-button';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusPriority';
import { Input } from './ui/input';
import UpdateTodoButton from './update-todo-button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Home = () => {

    const [ todos, setTodos ] = useState( [] );
    const [ search, setSearch ] = useState( "" );
    const [ priority, setPriority ] = useState( "" );
    const [ status, setStatus ] = useState( "" );
    const [ filteredTodos, setFilteredTodos ] = useState( [] )

    async function fetchTodos () {
        try {
            const todos = await getTodos();
            setTodos( todos );
            setFilteredTodos( todos );
        } catch ( error ) {
            toast.error( error.message )
            console.log( "Error while fetching todos: ", error.message )
        }
    }

    function handleSearch () {
        let new_todos = todos

        if ( search != "" ) {
            new_todos = new_todos.filter( todo =>
                todo.title.toLowerCase().includes( search.toLowerCase() ) ||
                todo.description.toLowerCase().includes( search.toLowerCase() )
            )
        }

        if ( status && status != "all" ) {
            new_todos = new_todos.filter( todo => todo.status == status )
        }

        if ( priority && priority != "all" ) {
            new_todos = new_todos.filter( todo => todo.priority == priority )
        }

        setFilteredTodos( new_todos )
    }



    useEffect( () => {
        handleSearch();
    }, [ search, priority, status ] )

    useEffect( () => {

        fetchTodos();

    }, [] )


    return (
        <>

            <div className="flex flex-wrap gap-5 justify-between w-[1000px] px-2 max-w-full mx-auto mt-8">
                <Input onChange={ ( e ) => setSearch( e.target.value ) } value={ search } placeholder="Search here..." className={ "max-w-[300px] text-sm" } />

                <div className="flex gap-3 justify-center">
                    <Select onValueChange={ ( val ) => setPriority( val ) } value={ priority }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Priorities</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={ ( val ) => setStatus( val ) } value={ status }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            <Table className="my-4 w-[800px] max-w-full mx-auto">
                <TableCaption>A list of your tasks.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredTodos.length == 0 ?
                            <>
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center">No Tasks Found</TableCell>
                                </TableRow>
                            </>
                            :
                            filteredTodos.map( ( todo ) => (
                                <TableRow key={ todo.id }>
                                    <TableCell>{ todo.id }</TableCell>
                                    <TableCell>{ todo.title }</TableCell>
                                    <TableCell>{ todo.description }</TableCell>
                                    <TableCell><PriorityBadge priority={ todo.priority } /></TableCell>
                                    <TableCell><StatusBadge status={ todo.status } /></TableCell>
                                    <TableCell>
                                        <UpdateTodoButton id={ todo.id } fetchTodos={ fetchTodos } current_todo={ todo } />
                                        <DeleteTodoButton fetchTodos={ fetchTodos } id={ todo.id } />
                                    </TableCell>
                                </TableRow>
                            ) )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Home
