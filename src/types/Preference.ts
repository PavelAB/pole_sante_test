export interface Preference {
    ["@id"]: string,
    ["@type"]: string,
    ["@context"]: string, // (string | object ? )

    id: number,
    anacad: string,
    matricule: string,
    hopital: number,
    service: number,
    ordre: number,
    typepref: number
}