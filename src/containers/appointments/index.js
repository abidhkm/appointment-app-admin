import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Button } from '@material-ui/core'
import { callApi } from '../../utils/api'
import AccordionComponent from '../../components/accordion'
import { formatDate } from '../../utils/formatDate'
import './style.scss';

const Appointments = () => {

    const [pendingRequests, setPendingRequests] = useState([])
    const [confirmedAppointment, setConfirmedAppointment] = useState([])

    useEffect(() => {
        const fetchPendingRequests = async () => {
            const res = await callApi('get', 'catalog/appointments?status=pending')
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
            start: req.timeslot.start,
            end: req.timeslot.end,
            user: req.user.name,
            contact: req.user.contact,
            email: req.user.email,
            id: req._id
        }))
    }, [pendingRequests])

    const formattedAppointments = useMemo(() => {
        return confirmedAppointment.map(req => ({
            start: req.timeslot.start,
            end: req.timeslot.end,
            user: req.user.name,
            contact: req.user.contact,
            email: req.user.email,
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

    return <div className="appointments" >
        <div style={{ marginTop: 20 }} />
        <Typography variant="h4" >Pending requests</Typography>
        <div style={{ marginTop: 10 }} />
        {
            formattedRequests.map((req, index) => <AccordionComponent
                key={index}
                summary={
                    <Typography variant="body1" >{formatDate(req.start)} {' <---> '} {formatDate(req.end)} : requested by {req.user} </Typography>
                }
                details={
                    <div className="request-details-container" >
                        <div className="request-details-info" >
                            <Typography variant="body1" > contact: {req.contact} </Typography>
                            <Typography variant="body1" >  email: {req.email} </Typography>
                        </div>
                        <div className="flex" >
                            <Button onClick={handleRequest('approve', req.id)} >Approve</Button>
                            <Button onClick={handleRequest('reject', req.id)} className="reject" >Reject</Button>
                        </div>
                    </div>
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
                    <Typography variant="body1" >{formatDate(req.start)} {' <---> '} {formatDate(req.end)} : requested by {req.user} </Typography>
                }
                details={
                    <div className="request-details-info" >
                        <Typography variant="body1" > contact: {req.contact} </Typography>
                        <Typography variant="body1" > email: {req.email} </Typography>
                    </div>
                }
            />)
        }

    </div>
}

export default Appointments