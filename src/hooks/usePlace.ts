import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { HookFetchParams } from "../types/HookFetchParams"
import { Place } from "../types/Place"
import { SuccessResponse } from "../types/SuccessResponse"
import { pathValidator } from "../utils/pathValidator"
import { fetchPaginatedCollectionT } from "../api/ApiShared"


const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN



/**
 * usePlaces - Custom React hook to handle the fetching of a collection of `Place`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/places?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/places?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Place` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Place>, Error>} An object containing the fetched data and other complementary information.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const usePlaces = ({
    token,
    searchQuery = "/places?page=1",
    shouldFetch = true
}: HookFetchParams): UseQueryResult<SuccessResponse<Place>, Error> => {


    const placeURLRegex: RegExp = /^\/places\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: placeURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Place>, Error>({
        queryKey: ["Places", token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Place>(token, searchQuery),
        enabled: shouldFetch
    })
}