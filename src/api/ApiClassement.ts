import { Classement } from "../types/Classement"
import { ErrorResponse } from "../types/ErrorResponse"
import { SuccessResponse } from "../types/SuccessResponse"


const POLE_SANTE_URL: string = import.meta.env.VITE_POLE_SANTE_API_URL


/**
 * fetchClassements - Retrieves a paginated collection of `Classement`. Should be used with the `useClassement` hook.
 * 
 * @param {string} searchQuery - Represents the part of the URL containing the relative path for the resource and a query string specifying the desired page.
 * @param {string} token - The token used for authorization in the request. 
 * @returns {SuccessResponse<Classement>} A promise that resolves to a `SuccessResponse<Classement>`.
 * @throws {Error} If the fetch operation fails or the response contains an error.
 */
export const fetchClassements = async (token: string, searchQuery: string): Promise<SuccessResponse<Classement>> => {
    const url: string = POLE_SANTE_URL + searchQuery
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Accept": "application/ld+json"
        }
    })

    const result: SuccessResponse<Classement> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`${errorResponse["hydra:description"]}`)
    }
    
    return result as SuccessResponse<Classement>
}
