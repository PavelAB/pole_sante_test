import { useEffect, useState } from "react"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import { useServiceByID } from "../../hooks/useService"
import { useParams } from "react-router-dom"


const columnsTitle: string[] = ["#", "Nom du service"]

const ServiceDetailsPage: React.FC = () => {

    const { ID_Service } = useParams()

    const [searchString, setSearchString] = useState<string>()

    const { data: dataService, isLoading: isLoadingService, error: errorService } = useServiceByID({ token: "", searchQuery: searchString, shouldFetch: searchString ? true : false })

    useEffect(()=>{
        setSearchString(`/services/${ID_Service}`)
    }, [ID_Service])


    if (!dataService && isLoadingService) {
        return (
            <LoaderElement />
        )
    }
    if (errorService || (!dataService && !isLoadingService) || !dataService) {
        return (
            <ErrorMessage
                title="Non trouvé"
                subTitle="Une erreur inconnue est survenue, impossible de récupérer les données."
                goToPageTitle="Page d'accueil"
                goToPageURL="/"
            />
        )
    }

    return (
        <div className="max-w-[93%] mx-auto w-full col-span-12 flex flex-col items-center gap-5">
            <h1 className="mb-10">
                {columnsTitle[1]}: {dataService.nom}
            </h1>
        </div>
    )
}
export default ServiceDetailsPage