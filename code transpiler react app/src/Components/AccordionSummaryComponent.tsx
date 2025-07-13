import { AccordionSummary, PopperProps } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoToolTipComponent from "./InfoToolTipComponent";

export default function AccordionSummaryComponent({title, toolTipContent, toolTipPlacement}:{title:string, toolTipContent:string, toolTipPlacement:PopperProps['placement']|undefined}) {
  return (
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <b style = {{color: 'rgb(0, 82, 165)'}}>{title}</b>
   { toolTipContent && <InfoToolTipComponent  title= {toolTipContent} placement= {toolTipPlacement} />}
</AccordionSummary>
  )
}
