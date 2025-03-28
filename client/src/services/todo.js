import api from "@/helpers/api"

export async function createTodo ( todo ) {
    try {
        const response = await api.post( "/todos", todo, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.error || error.message )
    }
}

export async function getTodo ( id ) {
    try {
        const response = await api.get( "/todos/" + id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.error || error.message )
    }
}

export async function getTodos () {
    try {
        const response = await api.get( "/todos", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.error || error.message )
    }
}

export async function updateTodo ( id, todo ) {
    try {
        const response = await api.put( "/todos/" + id, todo, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.error || error.message )
    }
}

export async function deleteTodo ( id ) {
    try {
        const response = await api.delete( "/todos/" + id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.error || error.message )
    }
}