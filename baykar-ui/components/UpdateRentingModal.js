import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { updateRentedIHA } from "@/actions/renting";
import moment from "moment/moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";

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

export default function UpdateRenting({ renting, open, setOpen, refreshIHAs }) {
    const [rentingStartDate, setRentingStartDate] = useState(dayjs(renting.renting_start_date));
    const [rentingEndDate, setRentingEndDate] = useState(dayjs(renting.renting_end_date));

    const handleClose = () => setOpen(false);

    const editRenting = async () => {
        let rentedIhaData = {
            iha: renting.iha.pk,
            renting_start_date: rentingStartDate,
            renting_end_date: rentingEndDate,
        };
        const response = await updateRentedIHA(renting.id, rentedIhaData);
        if (response.status === 200) {
            refreshIHAs();
            toast.success("Renting successfully updated");
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
                        Update <b>{`${renting.iha.brand} - ${renting.iha.model}`}</b>
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ mb: 1, mt: 3 }}>
                            <Typography>Start Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    format="DD-MM-YYYY HH:mm"
                                    label=""
                                    value={rentingStartDate}
                                    onChange={(e) => setRentingStartDate(e)}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography>End Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    format="DD-MM-YYYY HH:mm"
                                    label=""
                                    value={rentingEndDate}
                                    onChange={(e) => setRentingEndDate(e)}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Button variant="contained" color="success" onClick={() => editRenting()}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
