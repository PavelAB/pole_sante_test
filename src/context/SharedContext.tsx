import { createContext, ReactNode, useContext, useEffect, useState } from "react"



export interface SharedContextProps {
    screenSize: number
}

interface SharedProviderProps {
    children: ReactNode
}


const SharedContext = createContext<SharedContextProps | undefined >(undefined)


export const SharedProvider: React.FC<SharedProviderProps> = ({children}) => {

    const [screenSize, setScreenSize] = useState<number>(window.innerWidth)
    
    useEffect(() => {
        const updateScreenSize = (): void => {
            setScreenSize(window.innerWidth)
        }

        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)

        return () => window.removeEventListener('resize', updateScreenSize)
    })


    return (
        <SharedContext.Provider value={{screenSize}}>
            {children}
        </SharedContext.Provider>
    )
}

/**
 * Custom hook to access the `SharedContext`.
 *
 * Provides access to the screenSize state
 * - `screenSize`: The current screen size
 * 
 * @returns {UserContextProps} The screenSize context
 * 
 * @throws {Error} If used outside of a `SharedProvider`.
 */
export const useScreenSize = (): SharedContextProps => {
    const context = useContext(SharedContext)
    if(!context){
        throw new Error('useScreenSize must be used within a SharedProvider');
    }
    return context
}