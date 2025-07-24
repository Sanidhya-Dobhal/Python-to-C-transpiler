import { PopperProps, Tooltip } from '@mui/material'
import InfoOutlineSharpIcon from '@mui/icons-material/InfoOutlineSharp';

export default function InfoToolTipComponent({title,placement, color='gray'}:{title:string,placement:PopperProps['placement']|undefined,color?:string}) {
  return (
        <Tooltip title = {title} placement= {placement}>
        <InfoOutlineSharpIcon sx = {{color: {color}, height:"20px"}}/>
        </Tooltip>
  )
}
