import React, { useEffect, useState } from "react";
import styles from "./Tascks.module.css";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Tascks = () => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openViewTasck, setOpenViewTasck] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dataTask, setDataTask] = useState();

  const handleClickOpenAddTasck = () => {
    setOpenAddTask(true);
  };

  console.log(dataTask);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      console.log(response.data);
      setDataTask(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        title: "privet",
        description: "description",
        status: "done",
        date: "12.01.2025",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
    }
  };

  console.log(dataTask);

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
    }
  };

  const handleCloseAddTasck = () => {
    setOpenAddTask(false);
  };

  const handleClickOpenViewTasck = () => {
    setOpenViewTasck(true);
  };

  const handleCloseViewTasck = () => {
    setOpenViewTasck(false);
  };

  const handleFormSubmit = () => {
    setTitle("");
    setContent("");
    setPriority("normal");
    handleCloseAddTasck();
  };

  return (
    <div className={styles.tascksWrapper}>
      <div className={styles.tascksBoard}>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Open</p>
            <AddCircleOutlineIcon
              color="primary"
              style={{ width: "20px" }}
              onClick={handleSubmit}
            />
          </div>
          <div className={styles.ticketPlace}>
            {dataTask &&
              dataTask.map((item) => (
                <div className={styles.ticketWrapper}>
                  <div
                    className={styles.ticketContent}
                    onClick={() => {
                      handleClickOpenViewTasck();
                    }}
                  >
                    <div className={styles.TicketTitle}>
                      <p>{item.title}</p>
                    </div>
                    <div className={styles.TicketData}>
                      <p>Data add : {item.date}</p>
                    </div>
                  </div>
                  <div className={styles.ticketActions}>
                    <div className={styles.topAction}>
                      <div className={styles.ticketStatus}>
                        <p>{item.status}</p>
                      </div>
                      <DeleteIcon onClick={() => onDelete(item.id)} />
                    </div>
                    <Button variant="outlined" className={styles.ticketButton}>
                      Move
                    </Button>
                  </div>
                </div>
              ))}
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
          <div className={styles.ticketPlace}></div>
        </div>
      </div>
      <Dialog
        open={openAddTask}
        onClose={handleCloseAddTasck}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "17px",
            maxWidth: "800px",
          },
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
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTasck}>Cancel</Button>
          <Button
            onClick={handleFormSubmit}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewTasck}
        onClose={handleCloseViewTasck}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "17px",
            width: "800px",
            maxWidth: "800px",
          },
        }}
      >
        <DialogTitle>
          <div className={styles.viewTicketModalTitle}>
            <div className={styles.ticketStatus}>
              <p>Medium</p>
            </div>
            <CloseIcon
              sx={{ color: "red", width: "20px" }}
              onClick={() => handleCloseViewTasck()}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={styles.modalViewTicketContent}>
            <p>Privet</p>
            <p>
              {" "}
              blblasblslbklf dlkfb dkjfnb kdjnf bkdnf kjndflk dnfkl jbnfsdfs sdf
              sdf sdfsdf sdf sdf sdf sdf sdf sdfsdf sdf sd fsd fsd fsd fdfs dfs
              df sdf sdf sd fdkf jbndlkf jbn jnk jn kn kn lkn lkjn kj nklj n
              dklf jnbdk jfnbdklfjb ndklfb{" "}
            </p>
          </div>
          <div></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tascks;
