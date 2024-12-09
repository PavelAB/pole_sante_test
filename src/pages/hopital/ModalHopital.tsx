import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import IconX from "../../components/uiElements/icones/IconX"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { useHopitalByID } from "../../hooks/useHopital"
import { ModalProps } from "../../types/ModalProps"





const columnsTitle: string[] = ["#", "Nom abrégé de l'hôpital"]


const ModalHopital: React.FC<ModalProps> = ({open, onClose, searchString}) => {

    const { data: dataHopital, isLoading: isLoadingHopital, error: errorHopital} = useHopitalByID({token:"", searchQuery: searchString, shouldFetch: searchString? true : false})

    if (!dataHopital) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open? "visible bg-black/20" : "hidden"}`}>
                <LoaderElement />
            </div>
        )
    }
    if (errorHopital || (!dataHopital && !isLoadingHopital)) {
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
                            # {dataHopital.id}
                        </h1>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <p className="whitespace-normal">{columnsTitle[1]}: <br className="md:hidden" />{dataHopital.nomcourt}</p>
                        </div>

                </div>
        </div>
    )
}
export default ModalHopital