import { PopperProps, Tooltip } from '@mui/material'
import InfoOutlineSharpIcon from '@mui/icons-material/InfoOutlineSharp';

export default function InfoToolTipComponent({title,placement}:{title:string,placement:PopperProps['placement']|undefined}) {
  return (
        <Tooltip title = {title} placement= {placement}>
        <InfoOutlineSharpIcon />
        </Tooltip>
  )
}
