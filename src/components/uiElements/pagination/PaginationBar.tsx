import { useEffect, useState } from "react"
import { HydraView } from "../../../types/HydraView"

const PaginationBar:React.FC<{hydraView: HydraView, onClick: (searchQuery: string) => void}> = ({hydraView, onClick}) => {

    const [firstPage, setFirstPage] = useState<number>(-1)
    const [prevPage, setPrevPage] = useState<number>(-1)
    const [currentPage, setCurrentPage] = useState<number>(-1)
    const [nextPage, setNextPage] = useState<number>(-1)
    const [lastPage, setLastPage] = useState<number>(-1)


    useEffect(() => {
        setFirstPage(getLastCharacter(hydraView["hydra:first"]))
        setPrevPage(getLastCharacter(hydraView["hydra:previous"]))
        setCurrentPage(getLastCharacter(hydraView["@id"]))
        setNextPage(getLastCharacter(hydraView["hydra:next"]))
        setLastPage(getLastCharacter(hydraView["hydra:last"]))
    }, [hydraView])

    function handleClick(searchQuery: string){
        onClick(searchQuery)
    }

    function getLastCharacter(s: string | undefined):number {
        if(!s || s.length === 0) return -1

        const t: string = s[s.length-1]

        if(isNaN(Number(t)))
            return -1
        else
            return Number(t)
    }

    return (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {
                <li>
                    <button 
                        disabled={prevPage <= 0}
                        onClick={() => handleClick(hydraView["hydra:previous"]!)}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Précédente
                    </button>
                </li>
            }
            {
                firstPage > 0 && firstPage !== currentPage &&
                <li>
                    <button 
                        onClick={() => handleClick(hydraView["hydra:first"]!)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {firstPage}
                    </button>
                </li>
            }
            {
                currentPage - firstPage >= 2 && 
                <li>
                    <button
                        disabled
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            ...
                    </button>
                </li>
            }
            {
                currentPage &&
                <li>
                    <button
                        disabled 
                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            {currentPage}
                    </button>
                </li>
            }
            {
                lastPage - currentPage >= 2 && 
                <li>
                    <button 
                        disabled
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            ...
                    </button>
                </li>
            }
            {
                lastPage > 0 && lastPage !== currentPage &&
                <li>
                    <button 
                        onClick={() => handleClick(hydraView["hydra:last"]!)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {lastPage}
                    </button>
                </li>
            }
            {
                <li>
                    <button 
                        disabled={!(nextPage > 0 && nextPage <= lastPage)}
                        onClick={() => handleClick(hydraView["hydra:next"]!)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Suivante
                    </button>
                </li>
            }
        </ul>
    )
}
export default PaginationBar