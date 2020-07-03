import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Button } from '@material-ui/core'
import { callApi } from '../../utils/api'
import AccordionComponent from '../../components/accordion'

const Appointments = () => {

    const [pendingRequests, setPendingRequests] = useState([])
    const [confirmedAppointment, setConfirmedAppointment] = useState([])

    // useEffect(() => {

    //     fetchConfirmedAppointments();
    //     fetchPendingRequests();
    // }, [])


    useEffect(() => {
        const fetchPendingRequests = async () => {
            const res = await callApi('get', 'catalog/appointments?status=pending')
            // console.log(res)
            setPendingRequests(res.data)
        }
        const fetchConfirmedAppointments = async () => {
            const res = await callApi('get', 'catalog/appointments?status=confirmed')
            setConfirmedAppointment(res.data)
        }
        const interval = setInterval(() => {
            fetchConfirmedAppointments();
            fetchPendingRequests();
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const formattedRequests = useMemo(() => {
        return pendingRequests.map(req => ({
            start: req.slot.start,
            end: req.slot.end,
            user: req.buyer.user.name,
            contact: req.buyer.user.contact,
            email: req.buyer.user.email,
            id: req._id
        }))
    }, [pendingRequests])

    const formattedAppointments = useMemo(() => {
        return confirmedAppointment.map(req => ({
            start: req.slot.start,
            end: req.slot.end,
            user: req.buyer.user.name,
            contact: req.buyer.user.contact,
            email: req.buyer.user.email,
            id: req._id
        }))
    }, [confirmedAppointment])

    const handleRequest = (decision, requestId) => async () => {
        if (decision === "approve") {
            const res = await callApi('put', 'catalog/appointment', { requestId })
        }
        else {
            const res = await callApi('delete', `catalog/appointment?requestId=${requestId}`)
        }
    }

    return <div>
        <div style={{ marginTop: 20 }} />
        <Typography variant="h4" >Pending requests</Typography>
        <div style={{ marginTop: 10 }} />
        {
            formattedRequests.map((req, index) => <AccordionComponent
                key={index}
                summary={
                    <Typography variant="body1" >{req.start} {' - '} ${req.end} : requested by {req.user} </Typography>
                }
                details={
                    <>
                        <Typography variant="body1" > contact: {req.contact}, email: {req.email} </Typography>
                        <Button onClick={handleRequest('approve', req.id)} >Approve</Button>
                        <Button onClick={handleRequest('reject', req.id)} >Reject</Button>
                    </>
                }
            />)
        }

        <div style={{ marginTop: 30 }} />

        <Typography variant="h4" >Confirmed appointments</Typography>
        <div style={{ marginTop: 10 }} />

        {
            formattedAppointments.map((req, index) => <AccordionComponent
                key={index}
                summary={
                    <Typography variant="body1" >{req.start} {' - '} ${req.end} : requested by {req.user} </Typography>
                }
                details={
                    <Typography variant="body1" > contact: {req.contact}, email: {req.email} </Typography>
                }
            />)
        }

    </div>
}

export default Appointments