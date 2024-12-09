import ErrorMessage from "../../components/errorHandling/error/ErrorMessage"


const ResultatPage: React.FC = () => {
    return (
        <ErrorMessage
            title="Non disponible"
            subTitle="La page est en cours d'implémentation."
            goToPageTitle="Page d'accueil"
            goToPageURL="/"
        />
    )
}
export default ResultatPage