import React, { useEffect, useState } from 'react'

import Navbar from './Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { verifyUser } from '@/services/user';
import toast from 'react-hot-toast';

const Layout = () => {

    let [ isValid, setIsValid ] = useState( false );
    let [ loading, setLoading ] = useState( true );
    let [ user, setUser ] = useState( null );
    let token = localStorage.getItem( "token" );

    useEffect( () => {

        async function getUser ( token ) {
            try {
                let user = await verifyUser( token );
                setUser( user );
                setIsValid( true );
            } catch ( error ) {
                setIsValid( false )
                toast.error( error.message )
            } finally {
                setLoading( false );
            }
        }

        if ( token ) {
            getUser( token );
        } else {
            setLoading( false )
        }

    }, [] )

    if ( loading ) {
        return <div className="my-8 text-center text-xl md:text-3xl">Loading...</div>
    }

    return (
        <>
            { isValid ?
                <>
                    <Navbar user={ user } />
                    <Outlet />
                </>
                : <Navigate to="/login" /> }
        </>
    )
}

export default Layout
