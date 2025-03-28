import React from 'react'
import { Badge } from "@/components/ui/badge"

const PriorityBadge = ( { priority } ) => {

    if ( priority == "low" ) {
        return <Badge variant={ "success" }>{ priority }</Badge>
    } else if ( priority == "medium" ) {
        return <Badge variant={ "warning" }>{ priority }</Badge>
    } else {
        return <Badge variant={ "destructive" }>{ priority }</Badge>
    }

}

export default PriorityBadge
