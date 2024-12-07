import { useEffect, useState } from "react"
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement"
import { useClassements } from "../../hooks/useClassement"
import { Classement } from "../../types/Classement"


const RankingPage: React.FC = () => {


    const [classementRows, setClassementRows] = useState<Classement[]>([])

    const {data: responseClassement, isLoading: isLoadingClassement, error: errorClassement} = useClassements({token:""})

    useEffect(()=>{
        if(responseClassement) setClassementRows(responseClassement["hydra:member"]) 
    }, [responseClassement])


    if(!responseClassement && isLoadingClassement){
        return (
            <LoaderElement />
        )
    }

    const columnsTitle: string[] = ["#", "Matricule", "Annee academique", "Classement"]

    return (
        <div className="max-w-[93%] mx-auto w-full col-span-12 flex flex-col items-center">
            <h1 className="mb-10">Classements des Étudiants :</h1>
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        {
                            columnsTitle.map((column: string, index: number) => {
                                return (
                                    <th key={index + column} className="p-3 text-sm font-semibold tracking-wide text-center">
                                        {column}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        classementRows.map((row: Classement, index: number) => {
                            return (
                                <tr key={row.id} className="p-3 text-sm text-black text-center" style={{backgroundColor: (index + 1) % 2 === 1 ? "#e5e7eb" : "transparent"}}>
                                    <td>{row.id}</td>
                                    <td>{row.matricule}</td>
                                    <td>{row.anacad}</td>
                                    <td>{row.rang}</td>
                                </tr>
                            )
                        } )
                    }
                </tbody>

            </table>
        </div>
    )
}
export default RankingPage