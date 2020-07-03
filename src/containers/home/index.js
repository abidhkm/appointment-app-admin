import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Button } from '@material-ui/core'
import { callApi } from '../../utils/api'
import AccordionComponent from '../../components/accordion';
import NewTimeSlot from './newTimeSlot';
import { formatDate } from '../../utils/formatDate';
import './style.scss';

const Home = () => {

    const [slots, setSlots] = useState([]);

    // useEffect(() => {
    // }, [])

    useEffect(() => {
        const fetchTImeSlots = async () => {
            const res = await callApi('get', 'catalog/slots')
            setSlots(res.data)
        }
        const interval = setInterval(() => {
            fetchTImeSlots();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formattedSlots = useMemo(() => {
        return slots.map(({ start, end }) => ({
            start,
            end
            //other
        }))
    }, [slots])

    return <div className="home-page" >
        <div className="margin-10" />
        <div className="margin-10" />
        <Typography variant="h4" >Time slots</Typography>
        <div className="margin-10" />
        <NewTimeSlot />
        <div className="margin-10" />
        {
            formattedSlots.map((slot, index) => <AccordionComponent
                key={index}
                summary={
                    <Typography variant="body1" >{formatDate(slot.start)} {' <---> '} {formatDate(slot.end)} </Typography>
                }
                details={
                    <Typography variant="body1" > more details </Typography>
                }
            />)
        }
    </div>
}

export default Home