import gitHubLogo from '/src/assets/github-logo.png'
import './SourceButton.css'


function SourceButton() {

    return(
        <>
            <a href="https://github.com/MrPomidorchik" className="source-button"><img width="63px" height="63px" src={gitHubLogo} alt="MrPomidorchik GitHub Profile Logo"/></a>
            
        </>
    )
    
}

export default SourceButton