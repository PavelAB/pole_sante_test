import { RouteObject } from "react-router-dom"
import App from "../App"
import HomePage from "../pages/home/homePage"
import ClassementPage from "../pages/classement/ClassementPage"
import PlacePage from "../pages/place/PlacePage"
import HopitalPage from "../pages/hopital/HopitalPage"
import PreferencePage from "../pages/preference/PreferencePage"
import ResultatPage from "../pages/resultat/ResultPage"
import ServicePage from "../pages/service/ServicePage"



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
            path: "hopital",
            element: <HopitalPage />
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
            path: "service",
            element: <ServicePage />
        },
    ]
}]