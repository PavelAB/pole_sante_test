import { RouteObject } from "react-router-dom"
import App from "../App"
import HomePage from "../pages/home/homePage"
import ClassementPage from "../pages/classement/ClassementPage"
import PlacePage from "../pages/place/PlacePage"
import HopitalPage from "../pages/hopital/HopitalPage"
import PreferencePage from "../pages/preference/PreferencePage"
import ResultatPage from "../pages/resultat/ResultatPage"
import ServicePage from "../pages/service/ServicePage"
import ServiceDetailsPage from "../pages/service/ServiceDetailsPage"
import HopitalDetailsPage from "../pages/hopital/HopitalDetailsPage"



export const route: RouteObject[] = [{
    path: "",
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: "classement",
            element: <ClassementPage />
        },
        {
            path: "place",
            element: <PlacePage />
        },
        {
            path: "hopitals",
            element: <HopitalPage />
        },
        {
            path: "hopitals/:ID_Hopital",
            element: <HopitalDetailsPage />
        },
        {
            path: "preference",
            element: <PreferencePage />
        },
        {
            path: "resultat",
            element: <ResultatPage />
        },
        {
            path: "services",
            element: <ServicePage />
        },
        {
            path: "services/:ID_Service",
            element: <ServiceDetailsPage />
        }
    ]
}]