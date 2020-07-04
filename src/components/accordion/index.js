import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { makeStyles } from '@material-ui/core/styles';

const AccordionComponent = ({summary, details}) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Accordion expanded={expanded} onChange={() => handleChange()}>
            <AccordionSummary
                // expandIcon={<ExpandMoreIco />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                {summary}
                {/* <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>I am an accordion</Typography> */}
            </AccordionSummary>
            <AccordionDetails>
                {details}
                {/* <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                    maximus est, id dignissim quam.
          </Typography> */}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionComponent