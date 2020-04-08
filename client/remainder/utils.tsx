import * as React from 'react'

import { useParams } from "react-router-dom";


const useIdFromParam = (id?: string) => {
    if (id == null) {
        const params:any = useParams();
        id = params.id
    }
    return id!
}

export {
    useIdFromParam
}
