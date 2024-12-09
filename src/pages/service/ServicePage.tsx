import { useEffect, useState } from "react"
import { Service } from "../../types/Service"
import { HydraView } from "../../types/HydraView"
import { useServices } from "../../hooks/useService"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"
import { useNavigate } from "react-router-dom"


const columnsTitle: string[] = ["#", "Nom du service"]

const ServicePage: React.FC = () => {

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>("/services?page=1")

    //Classement data
    const [serviceArray, setServiceArray] = useState<Service[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()


    const { data: responseService, isLoading: isLoadingService, error: errorService } = useServices({ token: "", searchQuery: searchQuery })

    useEffect(() => {
        if (responseService) {
            setServiceArray(responseService["hydra:member"])
            setHydraView(responseService["hydra:view"])
        }
    }, [responseService])

    if (!responseService && isLoadingService) {
        return (
            <LoaderElement />
        )
    }
    if (errorService || (!responseService && !isLoadingService)) {
        return <ErrorMessage
            title="Non trouvé"
            subTitle="Une erreur inconnue est survenue, impossible de récupérer les données."
            goToPageTitle="Page d'accueil"
            goToPageURL="/"
        />
    }

    function handleClick(s: string){
        setSearchQuery(s)
    }

    return (
        <div className="max-w-[93%] mx-auto w-full col-span-12 flex flex-col items-center gap-5">
            <h1 className="mb-10">Classements des Étudiants :</h1>
            <div className="overflow-auto rounded-lg shadow w-full">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            {
                                columnsTitle.map((columnTitle: string, index: number) => {
                                    return (
                                        <th key={index + columnTitle} className="p-3 text-sm font-semibold tracking-wide text-center">
                                            {columnTitle}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {
                            serviceArray.map((service: Service, index: number) => {
                                return (
                                    <tr 
                                        onClick={() => navigate(service["@id"])}
                                        key={service.id} 
                                        className="text-center" 
                                        style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{service.id}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{service.nom}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-[80%] mx-10 flex justify-center items-center">
                {hydraView && <PaginationBar hydraView={hydraView} onClick={handleClick} />}
            </div>
        </div>
    )
}
export default ServicePage