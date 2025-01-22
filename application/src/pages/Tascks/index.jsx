import React, { useEffect, useState } from "react";
import styles from "./Tascks.module.css";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import IconButton from "@mui/material/IconButton";
import axios from "axios";

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
  const [status, setStatus] = useState("");

  const [dataTask, setDataTask] = useState([]);

  const [selectedItem, setSelectedItem] = useState({});

  const statuses = ["open", "in work", "testing", "done"];

  const getNextStatus = (currentStatus) => {
    const currentIndex = statuses.indexOf(currentStatus);
    if (currentIndex === statuses.length - 1) {
      return currentStatus;
    }
    return statuses[currentIndex + 1];
  };

  const getPreviousStatus = (currentStatus) => {
    const currentIndex = statuses.indexOf(currentStatus);
    if (currentIndex === 0) {
      return currentStatus;
    }
    return statuses[currentIndex - 1];
  };

  const handleClickOpenAddTasck = () => {
    setOpenAddTask(true);
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

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setDataTask(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        title: title,
        description: content,
        status: status,
        date: date,
      });
      if (response.data) {
        getData();
        handleCloseAddTasck();
      }
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${id}`);
      console.log(response.data);

      setDataTask((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    }
  };

  const moveToNextStatus = async (item) => {
    const nextStatus = getNextStatus(item.status);
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${item.id}`,
        {
          status: nextStatus,
        }
      );
      console.log("Task status updated:", response.data);

      setDataTask((prev) =>
        prev.map((task) =>
          task.id === item.id ? { ...task, status: nextStatus } : task
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const moveToPrevStatus = async (item) => {
    const prevStatus = getPreviousStatus(item.status);
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${item.id}`,
        {
          status: prevStatus,
        }
      );
      console.log("Task status updated:", response.data);

      setDataTask((prev) =>
        prev.map((task) =>
          task.id === item.id ? { ...task, status: prevStatus } : task
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className={styles.tascksWrapper}>
      <div className={styles.tascksBoard}>
        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Open</p>
            <AddCircleOutlineIcon
              color="primary"
              style={{ width: "20px", cursor: "pointer" }}
              onClick={handleClickOpenAddTasck}
            />
          </div>
          <div className={styles.ticketPlace}>
            {dataTask
              .filter((item) => item.status === "open")
              .map((item) => (
                <div className={styles.ticketWrapper} key={item.id}>
                  <div
                    className={styles.ticketContent}
                    onClick={() => {
                      handleClickOpenViewTasck();
                      setSelectedItem(item);
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
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(item.id)}
                      />
                    </div>
                    <div className={styles.moveButtons}>
                      <IconButton onClick={() => moveToPrevStatus(item)}>
                        <ArrowBackIosIcon />
                      </IconButton>
                      <IconButton onClick={() => moveToNextStatus(item)}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>In work</p>
          </div>
          <div className={styles.ticketPlace}>
            {dataTask
              .filter((item) => item.status === "in work")
              .map((item) => (
                <div className={styles.ticketWrapper} key={item.id}>
                  <div
                    className={styles.ticketContent}
                    onClick={() => {
                      handleClickOpenViewTasck();
                      setSelectedItem(item);
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
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(item.id)}
                      />
                    </div>
                    <div className={styles.moveButtons}>
                      <IconButton onClick={() => moveToPrevStatus(item)}>
                        <ArrowBackIosIcon />
                      </IconButton>
                      <IconButton onClick={() => moveToNextStatus(item)}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Testing</p>
          </div>
          <div className={styles.ticketPlace}>
            {dataTask
              .filter((item) => item.status === "testing")
              .map((item) => (
                <div className={styles.ticketWrapper} key={item.id}>
                  <div
                    className={styles.ticketContent}
                    onClick={() => {
                      handleClickOpenViewTasck();
                      setSelectedItem(item);
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
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(item.id)}
                      />
                    </div>
                    <div className={styles.moveButtons}>
                      <IconButton onClick={() => moveToPrevStatus(item)}>
                        <ArrowBackIosIcon />
                      </IconButton>
                      <IconButton onClick={() => moveToNextStatus(item)}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.boardColumn}>
          <div className={styles.boardTitle}>
            <p>Done</p>
            <CheckIcon color="success" style={{ width: "20px" }} />
          </div>
          <div className={styles.ticketPlace}>
            {dataTask
              .filter((item) => item.status === "done")
              .map((item) => (
                <div className={styles.ticketWrapper} key={item.id}>
                  <div
                    className={styles.ticketContent}
                    onClick={() => {
                      handleClickOpenViewTasck();
                      setSelectedItem(item);
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
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(item.id)}
                      />
                    </div>
                    <div className={styles.moveButtons}>
                      <IconButton onClick={() => moveToPrevStatus(item)}>
                        <ArrowBackIosIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
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
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in work">In work</MenuItem>
              <MenuItem value="testing">Testing</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={styles.modal_input}
            fullWidth
            label="Date"
            margin="dense"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTasck}>Cancel</Button>
          <Button
            onClick={handleFormSubmit}
            color="primary"
            variant="contained"
            disabled={!title || !content || !status || !date}
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
              <p>{selectedItem.status}</p>
            </div>
            <CloseIcon
              sx={{ color: "red", width: "20px", cursor: "pointer" }}
              onClick={handleCloseViewTasck}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={styles.modalViewTicketContent}>
            <p>{selectedItem.title}</p>
            <p>{selectedItem.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tascks;
