import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchPaginatedCollectionT, fetchTByID } from "../api/ApiShared"
import { SuccessResponse } from "../types/SuccessResponse"
import { Classement } from "../types/Classement"
import { pathValidator } from "../utils/pathValidator"
import { HookFetchParams } from "../types/HookFetchParams"


const POLE_SANTE_TOKEN: string = import.meta.env.VITE_POLE_SANTE_API_TOKEN


/**
 * useClassements - Custom React hook to handle the fetching of a collection of `Classement`.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = "/classements?page=1"] - Represents the part of the URL containing the relative path for the resource 
 * and a query string specifying the desired page. (Default is "/classements?page=1"). The format must be respected; only the page number can be changed.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Classement` data should be fetched or not. (Default is `true`).
 * 
 * @returns {UseQueryResult<SuccessResponse<Classement>, Error>} An object containing the fetched data and other complementary information, query status, and error information, if any.
 * @throws {Error} If an error occurs during the fetch operation.
 */
export const useClassements = ({
    token, 
    searchQuery = "/classements?page=1", 
    shouldFetch = true 
    }:HookFetchParams ): UseQueryResult<SuccessResponse<Classement>, Error> => {


    /**
     * //TODO En implémentant de cette manière, je pourrai utiliser les paramètres 'hydra:view' pour simplifier la navigation à travers les pages. 
     * L'inconvénient est que des vérifications supplémentaires seront nécessaires.
     */
    const rankingURLRegex: RegExp = /^\/classements\?page=[1-9][0-9]{0,2}$/

    if(!pathValidator({regex: rankingURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false

    if(!token) token = POLE_SANTE_TOKEN

    return useQuery<SuccessResponse<Classement>, Error>({
        queryKey: ['Classements', token, searchQuery],
        queryFn: () => fetchPaginatedCollectionT<Classement>(token, searchQuery),
        enabled: shouldFetch
    })
}


/**
 * useClassementByID - Custom React hook to fetch a `Classement` object by its ID.
 *
 * @param {HookFetchParams} params - An object containing the necessary variables for fetching data.
 * @param {string} params.token - The token used for authorization in the request.
 * @param {string} [params.searchQuery = ""] - Represents the part of the URL containing the relative path for the resource, including the object ID. 
 * Must follow the format `/classements/{id}` where `{id}` is a positive integer. Default is an empty string.
 * @param {boolean} [params.shouldFetch = true] - A boolean indicating whether the `Classement` data should be fetched or not. Default is `true`.
 * 
 * @returns {UseQueryResult<Classement, Error>} - An object containing the `Classement` data, query status, and error information, if any.
 * 
 * @throws {Error} - If an error occurs during the fetch operation.
 */
export const useClassementByID = ({
    token, 
    searchQuery = "", 
    shouldFetch = true 
    }:HookFetchParams ): UseQueryResult<Classement, Error> => {

    if(!token) token = POLE_SANTE_TOKEN

    const rankingByIDURLRegex: RegExp = /^\/classements\/[1-9][0-9]{0,5}$/

    if(!pathValidator({regex: rankingByIDURLRegex, stringToValidate: searchQuery}))
        shouldFetch = false


    return useQuery<Classement, Error>({
        queryKey: ['ClassementByID', token, searchQuery],
        queryFn: () => fetchTByID<Classement>(token, searchQuery),
        enabled: shouldFetch
    })
}