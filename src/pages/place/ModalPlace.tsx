import { useNavigate } from "react-router-dom"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import IconX from "../../components/uiElements/icones/IconX"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { usePlaceByID} from "../../hooks/usePlace"
import { ModalProps } from "../../types/ModalProps"

const columnsTitle: string[] = ["#", "Hôpital", "Service", "Places disponibles"]

const ModalPlace: React.FC<ModalProps> = ({open, onClose, searchString}) => {

    const navigate = useNavigate()

    const { data: dataPlace, isLoading: isLoadingPlace, error: errorPlace} = usePlaceByID({token:"", searchQuery: searchString, shouldFetch: searchString? true : false})

    if (!dataPlace && isLoadingPlace) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "hidden"}`}>
                <LoaderElement />
            </div>
        )
    }
    if (errorPlace || (!dataPlace && !isLoadingPlace) || !dataPlace) {
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
                            # {dataPlace?.id}
                        </h1>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <p className="cursor-pointer" onClick={() => navigate(`/hopitals/${dataPlace.hopital}`)}>{columnsTitle[1]}: {dataPlace.hopital}</p>
                            <p className="cursor-pointer" onClick={() => navigate(`/services/${dataPlace.service}`)}>{columnsTitle[2]}: {dataPlace.service}</p>
                            <p>{columnsTitle[3]}: {dataPlace.places}</p>
                        </div>

                </div>
        </div>
    )
}
export default ModalPlace
