import { useEffect, useState } from "react"
import { useScreenSize } from "../../context/SharedContext"
import { Place } from "../../types/Place"
import { HydraView } from "../../types/HydraView"
import { usePlaces } from "../../hooks/usePlace"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"
import ModalPlace from "./ModalPlace"
import { useNavigate } from "react-router-dom"

const columnsTitle: string[] = ["#", "Hôpital", "Service", "Places disponibles"]

const PlacePage: React.FC = () => {

    const {screenSize} = useScreenSize()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>("/places?page=1")

    //Place data
    const [placeArray, setPlaceArray] = useState<Place[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()

    //Modal
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalSearchParam, setModalSearchParam] = useState<string>()

    const { data: responsePlace, isLoading: isLoadingPlace, error: errorPlace } = usePlaces({ token: "", searchQuery: searchQuery })

    useEffect(() => {
        if (responsePlace) {
            setPlaceArray(responsePlace["hydra:member"])
            setHydraView(responsePlace["hydra:view"])
        }
    }, [responsePlace])

    if (!responsePlace && isLoadingPlace) {
        return (
            <LoaderElement />
        )
    }
    if (errorPlace || (!responsePlace && !isLoadingPlace) || !responsePlace) {
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
            <h1 className="mb-10">Liste des places disponibles dans les hôpitaux et services en Belgique :</h1>
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
                            placeArray.map((place: Place, index: number) => {
                                return (
                                    <tr 
                                        onClick={() => openModal(place["@id"])}
                                        key={place.id} 
                                        className="text-center" 
                                        style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{place.id}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap cursor-pointer" onClick={() => navigate(`/hopitals/${place.hopital}`)}>{place.hopital}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap cursor-pointer" onClick={() => navigate(`/services/${place.service}`)}>{place.service}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{place.places}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <div className="grid grid-cols-1 w-full gap-4">
                {
                    placeArray.map((place: Place, index: number) => {
                        return (
                            <div
                                key={`${index} - Card`}
                                onClick={() => openModal(place["@id"])} 
                                className="p-4 w-[80%] mx-auto bg-gray-100 rounded-lg shadow flex flex-col gap-2 items-center justify-center hover:border border-blue-300">
                                    <p>{columnsTitle[0]} {place.id}</p>
                                    <p className="cursor-pointer" onClick={() => navigate(`/hopitals/${place.hopital}`)}>{columnsTitle[1]}: {place.hopital}</p>
                                    <p className="cursor-pointer" onClick={() => navigate(`/services/${place.service}`)}>{columnsTitle[2]}: {place.service}</p>
                                    <p>{columnsTitle[3]}: {place.places}</p>
                            </div>
                        )
                    })
                }
            </div>
            }
            <div className="w-[80%] mx-10 flex justify-center items-center">
                {hydraView && <PaginationBar hydraView={hydraView} onClick={handleClick} />}
            </div>
            <ModalPlace open={isOpen} searchString={modalSearchParam} onClose={closeModal}/>
        </div>
    )
}
export default PlacePage