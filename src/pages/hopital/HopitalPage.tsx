import { useEffect, useState } from "react"
import { Hopital } from "../../types/Hopital"
import { HydraView } from "../../types/HydraView"
import { useHopitals } from "../../hooks/useHopital"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import ModalHopital from "./ModalHopital"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"


const columnsTitle: string[] = ["#", "Nom abrégé de l'hôpital"]

const HopitalPage: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState<string>("/hopitals?page=1")

    //Hopitals data
    const [hopitalArray, setHopitalArray] = useState<Hopital[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()

    //Modal
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalSearchParam, setModalSearchParam] = useState<string>()

    const { data: responseHopital, isLoading: isLoadingHopital, error: errorHopital } = useHopitals({ token: "", searchQuery: searchQuery })

    useEffect(() => {
        if (responseHopital) {
            setHopitalArray(responseHopital["hydra:member"])
            setHydraView(responseHopital["hydra:view"])
        }
    }, [responseHopital])

    if (!responseHopital && isLoadingHopital) {
        return (
            <LoaderElement />
        )
    }
    if (errorHopital || (!responseHopital && !isLoadingHopital)) {
        return <ErrorMessage
            title="Non trouvé"
            subTitle="Une erreur inconnue est survenue, impossible de récupérer les données."
            goToPageTitle="Page d'accueil"
            goToPageURL="/"
        />
    }

    function handleClick(s: string) {
        setSearchQuery(s)
    }
    function closeModal() {
        setIsOpen(false)
        setModalSearchParam("")
    }
    function openModal(searchParam: string) {
        setIsOpen(true)
        setModalSearchParam(searchParam)
    }

    return (
        <div className="max-w-[93%] mx-auto w-full col-span-12 flex flex-col items-center gap-5">
            <h1 className="mb-10">Liste des hôpitaux :</h1>


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
                            hopitalArray.map((hopital: Hopital, index: number) => {
                                return (
                                    <tr
                                        onClick={() => openModal(hopital["@id"])}
                                        key={hopital.id}
                                        className="text-center"
                                        style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{hopital.id}</td>
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{hopital.nomcourt}</td>
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
            <ModalHopital open={isOpen} searchString={modalSearchParam} onClose={closeModal} />
        </div>
    )
}
export default HopitalPage