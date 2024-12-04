export interface Place {
    ["@id"]: string,
    ["@type"]: string,
    ["@context"]: string, // (string | object ? ) 

    id: number,
    hopital: number,
    service: number,
    places: number
}