import React from "react"
import { NavLink } from "react-router-dom"

export interface CustomNavLinksProps {
    to: string,
    text: string
}

const CustomNavLinks: React.FC<CustomNavLinksProps> = ({to, text}) => {
    return (
        <NavLink  
            to={to}
            className={({ isActive, isPending }) => `${isPending ? "pending" : isActive ? "active" : ""} no-underline text-gray-900 hover:text-gray-400`}>
            {text}
        </NavLink>
    )
}
export default CustomNavLinks