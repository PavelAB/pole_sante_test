export interface HydraView{
    ["@id"]: string,
    ["@type"]: string,
    ["hydra:first"]?: string,
    ["hydra:last"]?: string,
    ["hydra:next"]?: string,
    ["hydra:previous"]?: string
}