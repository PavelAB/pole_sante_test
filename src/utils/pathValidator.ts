export const pathValidator = ({regex, stringToValidate}:{regex: RegExp, stringToValidate: string}): boolean => {

    if(stringToValidate.match(regex))
        return true
    return false

}