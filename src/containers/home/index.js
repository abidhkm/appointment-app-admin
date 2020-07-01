import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Button } from '@material-ui/core'
import { callApi } from '../../utils/api'
import AccordionComponent from '../../components/accordion';
import NewTimeSlot from './newTimeSlot';

const Home = () => {

    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchTImeSlots = async () => {
            const res = await callApi('get', 'catalog/slots')
            setSlots(res.data)
        }
        fetchTImeSlots();
    }, [])

    const formattedSlots = useMemo(() => {
        return slots.map(({ start, end }) => ({
            start,
            end
            //other
        }))
    }, [slots])

    return <div>
        <Typography variant="h4" >Time slots</Typography>
        <NewTimeSlot />
        {
            formattedSlots.map((slot, index) => <AccordionComponent
                key={index}
                summary={
                    <Typography variant="body1" >{slot.start} {' - '} ${slot.end} </Typography>
                }
                details={
                    <Typography variant="body1" > more details </Typography>
                }
            />)
        }
    </div>
}

export default Home