import React from "react";
import { NavLink } from "react-router-dom";

interface ErrorMessageProps {
    title: string,
    subTitle: string,
    goToPageTitle: string,
    goToPageURL: string,
    secondButtonTitle?: string,
    secondButtonAction?: () => void
}



const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, subTitle, goToPageTitle, goToPageURL, secondButtonAction, secondButtonTitle }) => {


    return (
        <div className="col-span-12 grid place-items-center bg-white px-6 py-4 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">{subTitle}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to={goToPageURL}
                        className={({ isActive, isPending }) => `${isPending ? "pending" : isActive ? "active" : ""} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                        {goToPageTitle}
                    </NavLink>
                    {secondButtonAction && secondButtonTitle &&
                        <a onClick={() => { secondButtonAction }} className="text-sm font-semibold text-gray-900">
                            {secondButtonTitle}
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage