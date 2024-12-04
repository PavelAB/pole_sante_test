export interface ErrorResponse{
    ["@id"]: string,
    ["@type"]: string,
    ["hydra:description"]: string,
    ["hydra:title"]: string,
    detail: string,
    status: number
    title: string,
    type: string,
}