import * as React from 'react'

type ContextType = {
    formBaseId: string,
    formGroupId?: string,
    value: any,
    setValue: any,
    formErrors: any,
    errors: any,
    commit: () => void,
}

export default React.createContext<ContextType | null>(null)
