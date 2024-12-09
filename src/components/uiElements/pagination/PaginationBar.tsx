import { useEffect, useState } from "react"
import { HydraView } from "../../../types/HydraView"
import PaginationButton from "./PaginationButton"

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

    
    /**
     * getLastCharacter - Retrieves the last sequence of digits in a string that represents a page number.
     * If the last sequence is not a number or if there is no sequence of digits at the end, it returns `-1`.
     * 
     * @param {string | undefined} s - A string, typically from a `Hydra:view` response, containing page-related information.
     * 
     * @returns {number} - The last sequence of digits from the string, representing the page number.
     * Returns `-1` if the last sequence is not a valid number or if no digits are found at the end.
     */
    function getLastCharacter(s: string | undefined):number {
        if(!s || s.length === 0) return -1

        const match = s.match(/\d+$/)

        if (match)
            return Number(match[0])
    
        return -1
    }

    return (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {
                <li>
                    <PaginationButton 
                        disabled={prevPage <= 0}
                        stringToReturn={hydraView["hydra:previous"]!}
                        title={"Précédente"}
                        onClick={(query) => handleClick(query)}
                        addStyle="ms-0 rounded-s-lg"/>
                </li>
            }
            {
                firstPage > 0 && firstPage !== currentPage &&
                <li>
                    <PaginationButton
                        stringToReturn={hydraView["hydra:first"]!}
                        title={firstPage}
                        onClick={(query) => handleClick(query)}/>
                </li>
            }
            {
                currentPage - firstPage >= 2 && 
                <li>
                    <PaginationButton 
                        disabled={true}
                        title={"..."}/>
                </li>
            }
            {
                currentPage &&
                <li>
                    <PaginationButton 
                        disabled={true}
                        title={currentPage}
                        replaceStyle={"flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"}/>
                </li>
            }
            {
                lastPage - currentPage >= 2 && 
                <li>
                    <PaginationButton 
                        disabled={true}
                        title={"..."}/>
                </li>
            }
            {
                lastPage > 0 && lastPage !== currentPage &&
                <li>
                    <PaginationButton
                        stringToReturn={hydraView["hydra:last"]!}
                        title={lastPage}
                        onClick={(query) => handleClick(query)}/>
                </li>
            }
            {
                <li>
                    <PaginationButton 
                        disabled={!(nextPage > 0 && nextPage <= lastPage)}
                        stringToReturn={hydraView["hydra:next"]!}
                        title={"Suivante"}
                        onClick={(query) => handleClick(query)}
                        addStyle="rounded-e-lg"/>
                </li>
            }
        </ul>
    )
}
export default PaginationBar