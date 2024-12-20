import { NavLink, useLocation } from "react-router-dom"
import CustomNavLinks, { CustomNavLinksProps } from "../../uiElements/link/CustomNavLinks"
import IconHome from "../../uiElements/icones/IconHome"
import { useEffect, useState } from "react"
import IconBars from "../../uiElements/icones/IconBars"


const linksForNavbar: CustomNavLinksProps[]= [
    {to:"/classement", text:"Classement"},
    {to:"/place", text:"Disponibilités"},
    {to:"/hopitals", text:"Hopitals"},
    {to:"/preference", text:"Preferences"},
    {to:"/resultat", text:"Répartition"},
    {to:"/services", text:"Services"}
]


const Header: React.FC = () => {

    const location = useLocation()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("Home")


    useEffect(()=>{        
        updateMobileTitle(location.pathname.split("/")[1])
    },[location.pathname])

    const handleIsOpenClick = (): void => {
        setIsOpen(prev => !prev)
    }
    function updateMobileTitle(pathName: string): void {
        let newTitle: string = "Home"
        switch (pathName) {
            case "classement":
                newTitle = "Classement"
                break;
            case "place":
                newTitle = "Disponibilités"
                break;
            case "hopitals":
                newTitle = "Hopitals"
                break;
            case "preference":
                newTitle = "Preferences"
                break;
            case "resultat":
                newTitle = "Répartition"
                break;
            case "services":
                newTitle = "Services"
                break;
            default:
                newTitle = "Home"
                break;
        }
        setTitle(newTitle)
    }
 
    return (
        <header className="m-0 col-span-12 flex flex-col justify-start items-center bg-slate-200">
            <div className="w-full flex justify-between items-center">
                <div className="mx-10 h-10 w-10 flex items-center justify-center">
                    <NavLink  
                        to={"/"}
                        onClick={() => { if(isOpen) setIsOpen(!isOpen)}}
                        className={({ isActive, isPending }) => `${isPending ? "pending" : isActive ? "active" : ""} no-underline text-gray-900 hover:text-gray-400`}>
                            <IconHome />                        
                    </NavLink>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex justify-center sm:hidden">
                        <span onClick={handleIsOpenClick}>
                            {title}
                        </span>
                    </div>
                    <div>
                        <ul className="w-auto hidden sm:flex flex-row space-x-0 sm:space-x-4">
                            {
                                linksForNavbar.map((link: CustomNavLinksProps, index: number) => {
                                    return (
                                        <li key={`li-${index}-${link.text}`}>
                                            <CustomNavLinks to={link.to} text={link.text} />        
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    
                </div>
                <div className="mx-10 min-w-[41px] flex justify-center items-center sm:hidden">
                    <button onClick={handleIsOpenClick}>
                        <IconBars />
                    </button>
                </div>
            </div>
            <div>
                {isOpen &&
                    <ul className="flex flex-col gap-2 sm:hidden">
                        {
                            linksForNavbar.map((link: CustomNavLinksProps, index: number) => {
                                return (
                                    <li key={`li-${index}-${link.text}`} onClick={handleIsOpenClick}>
                                        <CustomNavLinks to={link.to} text={link.text} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </header>
    )
}
export default Header