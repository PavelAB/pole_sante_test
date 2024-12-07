import IconGitHub from "../../uiElements/icones/IconGitHub"


const Footer: React.FC = () => {
    return (
        <footer className="m-0 h-10 col-span-12 p-5 flex justify-between items-center bg-slate-200" >
                <p>
                    Epreuve technique - Pavel Bezukladnikov - 2024
                </p>
                <div className="flex space-x-10 text-slate-400 dark:text-slate-500">
                    <a href="https://github.com/PavelAB/pole_sante_test"
                        className="hover:text-slate-500 dark:hover:text-slate-400">
                        <span className="sr-only">GitHub</span>
                        <IconGitHub />
                    </a>
                </div>
            
        </footer>
    )
}

export default Footer