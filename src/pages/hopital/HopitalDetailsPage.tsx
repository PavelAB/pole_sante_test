import { useParams } from "react-router-dom"
import { useHopitalByID } from "../../hooks/useHopital"
import { useEffect, useState } from "react"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"


const columnsTitle: string[] = ["#", "Nom abrégé de l'hôpital"]

const HopitalDetailsPage: React.FC = () => {

    const { ID_Hopital } = useParams()

    const [searchString, setSearchString] = useState<string>()

    

    const { data: dataHopital, isLoading: isLoadingHopital, error: errorHopital } = useHopitalByID({ token: "", searchQuery: searchString, shouldFetch: searchString ? true : false })

    useEffect(()=>{
        setSearchString(`/hopitals/${ID_Hopital}`)
    }, [ID_Hopital])

    if (!dataHopital && isLoadingHopital) {
        return (
            <LoaderElement />
        )
    }
    if (errorHopital || (!dataHopital && !isLoadingHopital)) {
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
                {columnsTitle[1]}: {dataHopital!.nomcourt}
            </h1>
        </div>
    )
}
export default HopitalDetailsPage