export interface Resultat {
    ["@id"]: string,
    ["@type"]: string,
    ["@context"]: string, // (string | object ? )

    id: number,
    matricule: string,
    hopital: number,
    service: number
}