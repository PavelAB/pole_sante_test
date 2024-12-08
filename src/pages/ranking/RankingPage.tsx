import { useEffect, useState } from "react"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { useClassements } from "../../hooks/useClassement"
import { Classement } from "../../types/Classement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import { HydraView } from "../../types/HydraView"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"
import { useScreenSize } from "../../context/SharedContext"
import ModalRanking from "./ModalRanking"




const columnsTitle: string[] = ["#", "Matricule", "Année académique", "Classement"]


const RankingPage: React.FC = () => {

    const {screenSize} = useScreenSize()
    const [searchQuery, setSearchQuery] = useState<string>("/classements?page=1")

    //Classement data
    const [classementArray, setClassementArray] = useState<Classement[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()

    //Modal
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalSearchParam, setModalSearchParam] = useState<string>()


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
    function closeModal(){
        setIsOpen(false)
        setModalSearchParam("")
    }
    function openModal(searchParam: string){
        setIsOpen(true)
        setModalSearchParam(searchParam)
    }

    return (
        <div className="max-w-[93%] mx-auto w-full col-span-12 flex flex-col items-center gap-5">
            <h1 className="mb-10">Classements des Étudiants :</h1>
            { screenSize && screenSize > 640 ?

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
                                    <tr 
                                        onClick={() => openModal(classement["@id"])}
                                        key={classement.id} 
                                        className="text-center" 
                                        style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
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
            </div> :
            <div className="grid grid-cols-1 w-full gap-4">
                {
                    classementArray.map((classement: Classement, index: number) => {
                        return (
                            <div
                                key={`${index} - Card`}
                                onClick={() => openModal(classement["@id"])} 
                                className="p-4 w-[80%] mx-auto bg-gray-100 rounded-lg shadow flex flex-col gap-2 items-center justify-center">
                                    <p>{columnsTitle[0]} {classement.id}</p>
                                    <p>{columnsTitle[1]}: {classement.matricule}</p>
                                    <p>{columnsTitle[2]}: {classement.anacad}</p>
                                    <p>{columnsTitle[3]}: {classement.rang}</p>
                            </div>
                        )
                    })
                }
            </div>
            }
            <div className="w-[80%] mx-10 flex justify-center items-center">
                {hydraView && <PaginationBar hydraView={hydraView} onClick={handleClick} />}
            </div>
            <ModalRanking open={isOpen} searchString={modalSearchParam} onClose={closeModal}/>
        </div>
    )
}
export default RankingPage