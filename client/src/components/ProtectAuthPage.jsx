import { verifyUser } from '@/services/user';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const ProtectAuthPage = ( { children } ) => {

    let [ isValid, setIsValid ] = useState( false );
    let [ loading, setLoading ] = useState( true );
    let token = localStorage.getItem( "token" );

    useEffect( () => {

        async function getUser ( token ) {
            try {
                await verifyUser( token );
                setIsValid( true );
                toast.error( "Already logged in" )
            } catch ( error ) {
                setIsValid( false )
            } finally {
                setLoading( false );
            }
        }

        if ( token ) {
            getUser( token );
        } else {
            setIsValid( false )
        }

        setLoading( false )
    }, [] )

    if ( loading ) {
        return <div className="my-8 text-center text-xl md:text-3xl">Loading...</div>
    }

    return (
        <>

            {
                isValid ? <Navigate to="/" /> : children
            }

        </>
    )
}

export default ProtectAuthPage
