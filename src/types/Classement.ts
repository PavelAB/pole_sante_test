

export interface Classement {
    ["@id"]: string,
    ["@type"]: string,
    ["@context"]: string, // (string | object ? )

    id: number,
    matricule: string, 
    anacad: string,  
    rang: number
}