import React from 'react'
import { Badge } from "@/components/ui/badge"

const StatusBadge = ( { status } ) => {

    if ( status == "pending" ) {
        return <Badge variant={ "destructive" }>{ status }</Badge>
    } else if ( status == "in-progress" ) {
        return <Badge variant={ "warning" }>{ status }</Badge>
    } else {
        return <Badge variant={ "success" }>{ status }</Badge>
    }

}

export default StatusBadge
