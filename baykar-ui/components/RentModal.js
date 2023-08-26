import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { rentIHA } from "@/actions/renting";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function RentIHA({ open, setOpen, iha }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleClose = () => setOpen(false);

    const rentCurrentIHA = async () => {
        let rentData = {
            iha: iha.pk,
            renting_start_date: moment(startDate.toString()).format("YYYY-MM-DD HH:mm:ss"),
            renting_end_date: moment(endDate.toString()).format("YYYY-MM-DD HH:mm:ss"),
        };
        const response = await rentIHA(rentData);
        if (response.status === 200) {
            toast.success("Successfully rented");
            handleClose();
        } else {
            let errorMessage = await response.json();
            toast.error(JSON.stringify(errorMessage));
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Rent {`${iha.brand} - ${iha.model}`}
                    </Typography>
                    <Box sx={{ mb: 1, mt: 3 }}>
                        <Typography>Start Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                format="DD-MM-YYYY HH:mm"
                                label=""
                                onChange={(e) => setStartDate(e)}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography>End Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                format="DD-MM-YYYY HH:mm"
                                label=""
                                onChange={(e) => setEndDate(e)}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Button variant="contained" color="primary" onClick={() => rentCurrentIHA()}>
                        Rent
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
