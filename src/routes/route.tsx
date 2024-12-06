import { RouteObject } from "react-router-dom"
import App from "../App"
import HomePage from "../pages/home/homePage"
import RankingPage from "../pages/ranking/RankingPage"
import PlacePage from "../pages/place/PlacePage"
import HospitalPage from "../pages/hospital/HospitalPage"
import PreferencePage from "../pages/preference/PreferencePage"
import ResultPage from "../pages/result/ResultPage"
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
            element: <RankingPage />
        },
        {
            path: "place",
            element: <PlacePage />
        },
        {
            path: "hopital",
            element: <HospitalPage />
        },
        {
            path: "preference",
            element: <PreferencePage />
        },
        {
            path: "resultat",
            element: <ResultPage />
        },
        {
            path: "service",
            element: <ServicePage />
        },
    ]
}]