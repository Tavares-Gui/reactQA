import style from '../styles/styleModal.module.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Draggable from 'react-draggable';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

export const MyModal = ({ index, item }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} className={style.btn}>Info</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h1 className={style.labels}>{item.name}</h1>
                            <h2 className={style.labels}>{item.type}</h2>
                            <h2 className={style.labels}>{item.gender}</h2>
                            <h2 className={style.labels}>{item.species}</h2>
                        </div>
                        <div>
                            <img style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '10px' }} src={item.image}></img>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}