

interface PaginationButtonProps {
    disabled?: boolean,
    stringToReturn?: string,
    title: string | number,
    replaceStyle?: string,
    addStyle?: string
    onClick?: (s: string) => void
}


const PaginationButton: React.FC<PaginationButtonProps> = ({disabled = false, stringToReturn, title, replaceStyle, addStyle, onClick}) => {
    
    let currentStyle: string = "flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white leading-tight"

    if(replaceStyle)
       currentStyle = replaceStyle
    else
        currentStyle = `${currentStyle} ${addStyle}`    
    
    
    return (
        <button
            disabled={disabled}
            onClick={onClick && stringToReturn ? () => onClick(stringToReturn) : undefined}
            className={currentStyle}
            >
                {title}
        </button>
    )
}
export default PaginationButton