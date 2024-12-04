import { HydraView } from "./HydraView"



export interface SuccessResponse<T>{
    ["@context"]: string,
    ["@id"]: string,
    ["@type"]: string,

    ["hydra:totalItems"]: number,
    ["hydra:member"]: T[],

    ["hydra:view"]: HydraView

}