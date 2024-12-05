import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Service } from "../types/Service"
import { SuccessResponse } from "../types/SuccessResponse"
import { pathValidator } from "../utils/pathValidator"
import { fetchPaginatedCollectionT } from "../api/ApiShared"
import { HookFetchParams } from "../types/HookFetchParams"

const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN



/**
 * useServices - Custom React hook to handle the fetching of a collection of `Service`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/services?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/services?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Service` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Service>, Error>} An object containing the fetched data and other complementary information.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const useServices = ({
    token,
    searchQuery = "/services?page=1",
    shouldFetch = true
}: HookFetchParams): UseQueryResult<SuccessResponse<Service>, Error> => {


    const serviceURLRegex: RegExp = /^\/services\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: serviceURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Service>, Error>({
        queryKey: ["Services", token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Service>(token, searchQuery),
        enabled: shouldFetch
    })
}