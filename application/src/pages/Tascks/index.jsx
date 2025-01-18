import React, { useState } from 'react';
import styles from './Tascks.module.css';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Tascks = () => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleClickOpen = () => {
    setOpenAddTask(true);
  };

  const handleClose = () => {
    setOpenAddTask(false);
  };

  const handleFormSubmit = () => {
    setTitle('');
    setContent('');
    setPriority('normal');
    handleClose();
  };

  return (
    <div className={styles.tascksWrapper}>
      <div className={styles.tascksBoard}>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Open</p>
            <AddCircleOutlineIcon color="primary" style={{ width: '20px' }} onClick={handleClickOpen} />
          </div>
          <div className={styles.ticketPlace}>
            <div className={styles.ticketWrapper}>
              <div className={styles.ticketContent}>
                <div className={styles.TicketTitle}>
                  <p>Privet</p>
                </div>
                <div className={styles.TicketData}>
                  <p>Data add : 12/04/24</p>
                </div>
              </div>
              <div className={styles.ticketActions}>
                <div className={styles.ticketStatus}>
                  <p>Medium</p>
                </div>
                <Button variant="outlined" className={styles.ticketButton}>Outlined</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>In work</p>
          </div>
          <div className={styles.ticketPlace}></div>
        </div>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Testing</p>
          </div>
          <div className={styles.ticketPlace}></div>
        </div>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Done</p>
            <CheckIcon color="success" style={{ width: "20px" }} />
          </div>
          <div className={styles.ticketPlace}>
            <div className={styles.ticketWrapper}>
              <div className={styles.ticketContent}>
                <div className={styles.TicketTitle}>
                  <p>Privet</p>
                </div>
                <div className={styles.TicketData}>
                  <p>Data add : 12/04/24</p>
                </div>
              </div>
              <div className={styles.ticketActions}>
                <div className={styles.ticketStatus}>
                  <p>Medium</p>
                </div>
                <Button variant="outlined" className={styles.ticketButton}>Outlined</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openAddTask}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '17px',
            maxWidth: '800px',
          }
        }}
      >
        <DialogTitle>Add Ticket</DialogTitle>
        <DialogContent>
          <TextField
            className={styles.modal_input}
            fullWidth
            label="Title"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={styles.modal_input}
            fullWidth
            label="Content"
            margin="dense"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FormControl fullWidth margin="dense" className={styles.modal_input}>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tascks;
