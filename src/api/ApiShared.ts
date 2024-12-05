
import { Classement } from "../types/Classement"
import { ErrorResponse } from "../types/ErrorResponse"
import { Hopital } from "../types/Hopital"
import { Place } from "../types/Place"
import { Preference } from "../types/Preference"
import { Resultat } from "../types/Resultat"
import { Service } from "../types/Service"
import { SuccessResponse } from "../types/SuccessResponse"


const POLE_SANTE_URL: string = import.meta.env.VITE_POLE_SANTE_API_URL

// Type that includes all acceptable options for the generic
type AllowedTypes = Classement | Hopital | Place | Preference | Resultat | Service 


/**
 * fetchPaginatedCollectionT - Retrieves a paginated collection of a specific type <T>. This function is generic and can be reused for fetching various resources.
 * 
 * @template T - A generic type representing the resource being fetched. Must be one of the allowed types: [Classement, Hopital, Place, Preference, Resultat, Service].
 * 
 * @param {string} searchQuery - Represents the part of the URL containing the relative path for the resource and a query string specifying the desired page.
 * @param {string} token - The token used for authorization in the request. 
 * 
 * @returns {SuccessResponse<T>} A promise that resolves to a `SuccessResponse<T>`.
 * @throws {Error} If the fetch operation fails or the response contains an error.
 */
export const fetchPaginatedCollectionT = async <T extends AllowedTypes>(token: string, searchQuery: string): Promise<SuccessResponse<T>> => {
    const url: string = POLE_SANTE_URL + searchQuery
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Accept": "application/ld+json"
        }
    })

    const result: SuccessResponse<T> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`${errorResponse["hydra:description"]}`)
    }
    
    return result as SuccessResponse<T>
}
