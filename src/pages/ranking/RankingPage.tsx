import { useEffect, useState } from "react"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { useClassements } from "../../hooks/useClassement"
import { Classement } from "../../types/Classement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import { HydraView } from "../../types/HydraView"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"




const columnsTitle: string[] = ["#", "Matricule", "Année académique", "Classement"]


const RankingPage: React.FC = () => {


    const [classementArray, setClassementArray] = useState<Classement[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()
    const [searchQuery, setSearchQuery] = useState<string>("/classements?page=4")

    const { data: responseClassement, isLoading: isLoadingClassement, error: errorClassement } = useClassements({ token: "", searchQuery: searchQuery })

    useEffect(() => {
        if (responseClassement) {
            setClassementArray(responseClassement["hydra:member"])
            setHydraView(responseClassement["hydra:view"])
        }
    }, [responseClassement])


    if (!responseClassement && isLoadingClassement) {
        return (
            <LoaderElement />
        )
    }
    if (errorClassement || (!responseClassement && !isLoadingClassement)) {
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
                            classementArray.map((classement: Classement, index: number) => {
                                return (
                                    <tr key={classement.id} className="text-center" style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{classement.id}</td>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{classement.matricule}</td>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{classement.anacad}</td>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{classement.rang}</td>
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
export default RankingPage