import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import IconX from "../../components/uiElements/icones/IconX"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { usePreferenceByID } from "../../hooks/usePreference"
import { ModalProps } from "../../types/ModalProps"

const columnsTitle: string[] = ["#", "Année académique", "Matricule", "Hôpital", "Service", "Ordre de choix", "Préférence"]


const ModalPreference: React.FC<ModalProps> = ({open, onClose, searchString}) => {
    
    
    const { data: dataPreference, isLoading: isLoadingPreference, error: errorPreference} = usePreferenceByID({token:"", searchQuery: searchString, shouldFetch: searchString? true : false})

    if (!dataPreference) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "hidden"}`}>
                <LoaderElement />
            </div>
        )
    }
    if (errorPreference || (!dataPreference && !isLoadingPreference)) {
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
                            # {dataPreference?.id}
                        </h1>
                        <div className="flex flex-col gap-2 justify-center items-center">
                                    <p>{columnsTitle[1]}: {dataPreference.anacad}</p>
                                    <p>{columnsTitle[2]}: {dataPreference.matricule}</p>
                                    <p>{columnsTitle[3]}: {dataPreference.hopital}</p>
                                    <p>{columnsTitle[4]}: {dataPreference.service}</p>
                                    <p>{columnsTitle[5]}: {dataPreference.ordre}</p>
                                    <p className={`p-1.5 text-xs font-medium uppercase tracking-wider ${dataPreference.typepref === 1 ? "text-green-800 bg-green-200": "text-gray-800 bg-gray-200"} rounded-lg bg-opacity-50`}>{dataPreference.typepref === 1 ? "Préférence" : "Exclusion"}</p>
                        </div>

                </div>
        </div>
    )
}
export default ModalPreference