export interface Service {
    ["@id"]: string,
    ["@type"]: string,
    ["@context"]: string, // (string | object ? )

    id: number,
    nom: string
}