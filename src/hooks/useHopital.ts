import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SuccessResponse } from "../types/SuccessResponse"
import { Hopital } from "../types/Hopital"
import { HookFetchParams } from "../types/HookFetchParams"
import { pathValidator } from "../utils/pathValidator"
import { fetchPaginatedCollectionT, fetchTByID } from "../api/ApiShared"


const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN


/**
 * useHopitals - Custom React hook to handle the fetching of a collection of `Hopital`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/hopitals?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/hopitals?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Hopital` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Hopital>, Error>} An object containing the fetched data and other complementary information.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const useHopitals = ({
    token,
    searchQuery = "/hopitals?page=1",
    shouldFetch = true
}: HookFetchParams): UseQueryResult<SuccessResponse<Hopital>, Error> => {


    const hospitalURLRegex: RegExp = /^\/hopitals\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: hospitalURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Hopital>, Error>({
        queryKey: ["Hopitals", token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Hopital>(token, searchQuery),
        enabled: shouldFetch
    })
}



/**
 * useHopitalByID - Custom React hook to fetch a `Hopital` object by its ID.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = ""] - Represents the part of the URL containing the relative path for the resource, including the object ID. 
 * Must follow the format `/hopitals/{id}` where `{id}` is a positive integer. Default is an empty string.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Hopital` data should be fetched or not. Default is `true`.
 * 
 * @returns {UseQueryResult<Hopital, Error>} - An object containing the `Hopital` data, query status, and error information, if any.
 * 
 * @throws {Error} - If an error occurs during the fetch operation.
 */
export const useHopitalByID = ({
    token, 
    searchQuery = "", 
    shouldFetch = true 
    }:HookFetchParams ): UseQueryResult<Hopital, Error> => {

    if(!token) token = POLE_SANTE_TOKEN

    const hopitalByIdURLRegex: RegExp = /^\/hopitals\/[1-9][0-9]{0,5}$/

    if(!pathValidator({regex: hopitalByIdURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false


    return useQuery<Hopital, Error>({
        queryKey: ['HopitalByID', token, searchQuery],
        queryFn: () => fetchTByID<Hopital>(token, searchQuery),
        enabled: shouldFetch
    })
}