import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Resultat } from "../types/Resultat"
import { SuccessResponse } from "../types/SuccessResponse"
import { HookFetchParams } from "../types/HookFetchParams"
import { pathValidator } from "../utils/pathValidator"
import { fetchPaginatedCollectionT } from "../api/ApiShared"

const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN




/**
 * useResultats - Custom React hook to handle the fetching of a collection of `Resultat`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/resultats?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/resultats?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Resultat` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Resultat>, Error>} An object containing the fetched data and other complementary information.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const useResultats = ({
    token,
    searchQuery = "/resultats?page=1",
    shouldFetch = true
}: HookFetchParams): UseQueryResult<SuccessResponse<Resultat>, Error> => {


    const resultURLRegex: RegExp = /^\/resultats\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: resultURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Resultat>, Error>({
        queryKey: ["Resultats", token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Resultat>(token, searchQuery),
        enabled: shouldFetch
    })
}