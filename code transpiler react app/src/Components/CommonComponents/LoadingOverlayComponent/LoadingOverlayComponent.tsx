import { CircularProgress, Fade } from "@mui/material"
import styles from "./LoadingOverlayComponent.module.css"

export default function LoadingOverlayComponent({loadingState,delay}:{loadingState:boolean,delay:string}) {
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
