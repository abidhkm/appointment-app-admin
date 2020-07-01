import React, { useState } from 'react'
import DialogComponent from '../../components/dialog';
import { makeStyles, Button, TextField } from '@material-ui/core';
import { callApi } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        margin: '8px 0'
    },
}));

const NewTimeSlot = () => {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = useState({
        start: new Date(),
        end: new Date()
    })

    const handleChange = (label) => (e) => {
        setValue({ ...value, [label]: e.target.value })
    }


    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleOK = async () => {

        const start = new Date(value.start).toISOString();
        const end = new Date(value.end).toISOString();

        await callApi('post', 'catalog/slot', { start, end })

        setOpenModal(false)
    }

    return (
        <>
            <Button onClick={handleOpenModal}>+ Add time slot</Button>

            <DialogComponent open={openModal} setOpen={setOpenModal} handleOK={handleOK} >
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <TextField
                        classes={classes.textField}
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange('start')}
                    />
                    <TextField
                        classes={classes.textField}
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange('end')}
                    />
                </div>
            </DialogComponent>
        </>
    )
}

export default NewTimeSlot;