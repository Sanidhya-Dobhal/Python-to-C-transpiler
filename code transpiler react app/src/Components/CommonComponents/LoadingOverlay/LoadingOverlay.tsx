import { CircularProgress, Fade } from "@mui/material"
import styles from "./LoadingOverlay.module.css"

export default function LoadingOverlay({loadingState,delay}:{loadingState:boolean,delay:string}) {
  return <Fade
        in={loadingState}
        style={{
        transitionDelay: loadingState ? delay : '0ms',
         }}
        unmountOnExit
    >
        <div className = {styles.overlay}>
            <CircularProgress size = {'48px'} sx = {{color:'white'}}/>
        </div>
    </Fade>
}
