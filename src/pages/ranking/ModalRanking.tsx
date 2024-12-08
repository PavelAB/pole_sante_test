import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import IconX from "../../components/uiElements/icones/IconX"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { useClassementByID } from "../../hooks/useClassement"


interface ModalRankingProps {
    open: boolean,
    searchString: string | undefined,
    onClose: () => void
}

const columnsTitle: string[] = ["#", "Matricule", "Année académique", "Classement"]


const ModalRanking: React.FC<ModalRankingProps> = ({open, onClose, searchString}) => {

    const { data: dataClassement, isLoading: isLoadingClassement, error: errorClassement} = useClassementByID({token:"", searchQuery: searchString, shouldFetch: searchString? true : false})

    if (!dataClassement) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "hidden"}`}>
                <LoaderElement />
            </div>
        )
    }
    if (errorClassement || (!dataClassement && !isLoadingClassement)) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "hidden"}`}>
                <ErrorMessage
                    title="Non trouvé"
                    subTitle="Une erreur inconnue est survenue, impossible de récupérer les données."
                    goToPageTitle="Page d'accueil"
                    goToPageURL="/"
                />
            </div>
        )
    }
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "invisible"}`}
            onClick={onClose}>
                <div
                    onClick={(e) => e.stopPropagation()} 
                    className={`bg-white rounded-xl shadow p-10 transition-all ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}`}>
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gry-600">
                                <IconX />
                        </button>
                        <h1 className="text-center border-b border-gray-300 mb-4">
                            # {dataClassement?.id}
                        </h1>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <p>{columnsTitle[1]}: {dataClassement.matricule}</p>
                            <p>{columnsTitle[2]}: {dataClassement.anacad}</p>
                            <p>{columnsTitle[3]}: {dataClassement.rang}</p>
                        </div>

                </div>
        </div>
    )
}
export default ModalRanking