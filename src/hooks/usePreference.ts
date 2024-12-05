import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchPaginatedCollectionT, fetchTByID } from "../api/ApiShared"
import { Preference } from "../types/Preference"
import { SuccessResponse } from "../types/SuccessResponse"
import { pathValidator } from "../utils/pathValidator"
import { HookFetchParams } from "../types/HookFetchParams"

const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN



/**
 * usePreferences - Custom React hook to handle the fetching of a collection of `Preference`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/preferences?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/preferences?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Preference` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Preference>, Error>} An object containing the fetched data and other complementary information.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const usePreferences = ({
    token,
    searchQuery = "/preferences?page=1",
    shouldFetch = true
}: HookFetchParams): UseQueryResult<SuccessResponse<Preference>, Error> => {


    const preferenceURLRegex: RegExp = /^\/preferences\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: preferenceURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Preference>, Error>({
        queryKey: ["Preferences", token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Preference>(token, searchQuery),
        enabled: shouldFetch
    })
}


/**
 * usePreferenceByID - Custom React hook to fetch a `Preference` object by its ID.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = ""] - Represents the part of the URL containing the relative path for the resource, including the object ID. 
 * Must follow the format `/preferences/{id}` where `{id}` is a positive integer. Default is an empty string.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Preference` data should be fetched or not. Default is `true`.
 * 
 * @returns {UseQueryResult<Preference, Error>} - An object containing the `Preference` data, query status, and error information, if any.
 * 
 * @throws {Error} - If an error occurs during the fetch operation.
 */
export const usePreferenceByID = ({
    token, 
    searchQuery = "", 
    shouldFetch = true 
    }:HookFetchParams ): UseQueryResult<Preference, Error> => {

    if(!token) token = POLE_SANTE_TOKEN

    const preferenceByIdURLRegex: RegExp = /^\/preferences\/[1-9][0-9]{0,5}$/

    if(!pathValidator({regex: preferenceByIdURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false


    return useQuery<Preference, Error>({
        queryKey: ['PreferenceByID', token, searchQuery],
        queryFn: () => fetchTByID<Preference>(token, searchQuery),
        enabled: shouldFetch
    })
}