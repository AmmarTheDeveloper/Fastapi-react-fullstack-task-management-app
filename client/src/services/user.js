import api from "@/helpers/api"

export async function registerUser ( user ) {
    try {
        await api.post( "/auth/register", user )
    } catch ( error ) {
        throw new Error( error?.response?.data?.message || error.message );
    }
}

export async function loginUser ( user ) {
    try {
        let response = await api.post( "/auth/login", user );
        return response.data;
    } catch ( error ) {
        throw new Error( error?.response?.data?.message || error.message );
    }
}
export async function verifyUser ( token ) {
    try {
        let response = await api.post( "/auth/verify", {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        } )
        return response.data
    } catch ( error ) {
        throw new Error( error?.response?.data?.message || error.message );

    }
}