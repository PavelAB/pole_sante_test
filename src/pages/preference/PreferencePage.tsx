import { useEffect, useState } from "react"
import { useScreenSize } from "../../context/SharedContext"
import { Preference } from "../../types/Preference"
import { HydraView } from "../../types/HydraView"
import { usePreferences } from "../../hooks/usePreference"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"
import PaginationBar from "../../components/uiElements/pagination/PaginationBar"
import ModalPreference from "./ModalPreference"
import { useNavigate } from "react-router-dom"


const columnsTitle: string[] = ["#", "Année académique", "Matricule", "Hôpital", "Service", "Ordre de choix", "Préférence"]

const PreferencePage: React.FC = () => {

    const {screenSize} = useScreenSize()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>("/preferences?page=1")

    //Preference data
    const [preferenceArray, setPreferenceArray] = useState<Preference[]>([])
    const [hydraView, setHydraView] = useState<HydraView>()

    //Modal
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalSearchParam, setModalSearchParam] = useState<string>()



    const { data: responsePreference, isLoading: isLoadingPreference, error: errorPreference } = usePreferences({ token: "", searchQuery: searchQuery })

    useEffect(() => {
        if (responsePreference) {
            setPreferenceArray(responsePreference["hydra:member"])
            setHydraView(responsePreference["hydra:view"])
        }
    }, [responsePreference])

    if (!responsePreference && isLoadingPreference) {
        return (
            <LoaderElement />
        )
    }
    if (errorPreference || (!responsePreference && !isLoadingPreference)) {
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
            <h1 className="mb-10">Préférences des étudiants :</h1>
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
                            preferenceArray.map((preference: Preference, index: number) => {
                                return (
                                    <tr 
                                        onClick={() => openModal(preference["@id"])}
                                        key={preference.id} 
                                        className="text-center" 
                                        style={{ backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent" }}>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{preference.id}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{preference.anacad}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{preference.matricule}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{preference.hopital}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap cursor-pointer"onClick={() => navigate(`/services/${preference.service}`)}>{preference.service}</td>
                                            <td className="p-3 text-sm text-black whitespace-nowrap">{preference.ordre}</td>
                                            <td><p className={`p-1.5 text-xs font-medium uppercase tracking-wider ${preference.typepref === 1 ? "text-green-800 bg-green-200": "text-gray-800 bg-gray-200"} rounded-lg bg-opacity-50`}>{preference.typepref === 1 ? "Préférence" : "Exclusion"}</p></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <div className="grid grid-cols-1 w-full gap-4">
                {
                    preferenceArray.map((preference: Preference, index: number) => {
                        return (
                            <div
                                key={`${index} - Card`}
                                onClick={() => openModal(preference["@id"])} 
                                className="p-4 w-[80%] mx-auto bg-gray-100 rounded-lg shadow flex flex-col gap-2 items-center justify-center">
                                    <p>{columnsTitle[0]} {preference.id}</p>
                                    <p>{columnsTitle[1]}: {preference.anacad}</p>
                                    <p>{columnsTitle[2]}: {preference.matricule}</p>
                                    <p>{columnsTitle[3]}: {preference.hopital}</p>
                                    <p className="cursor-pointer" onClick={() => navigate(`/services/${preference.service}`)}>{columnsTitle[4]}: {preference.service}</p>
                                    <p>{columnsTitle[5]}: {preference.ordre}</p>
                                    <p className={`p-1.5 text-xs font-medium uppercase tracking-wider ${preference.typepref === 1 ? "text-green-800 bg-green-200": "text-gray-800 bg-gray-200"} rounded-lg bg-opacity-50`}>{preference.typepref === 1 ? "Préférence" : "Exclusion"}</p>

                            </div>
                        )
                    })
                }
            </div>
            }
            <div className="w-[80%] mx-10 flex justify-center items-center">
                {hydraView && <PaginationBar hydraView={hydraView} onClick={handleClick} />}
            </div>
            <ModalPreference open={isOpen} searchString={modalSearchParam} onClose={closeModal}/>
        </div>
    )
}
export default PreferencePage