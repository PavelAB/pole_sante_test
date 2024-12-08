import React from "react";
import IconLoader from "../icones/IconLoader";


const LoaderElement: React.FC = () => {


    return (

        <div role="status" className="col-span-12 grid place-items-center">
            <div className="mx-auto max-w-md flex flex-col">
                <h1>Loading...</h1>
                <IconLoader />
                <span className="sr-only">Loading...</span>
            </div>

        </div>
    )
}

export default LoaderElement