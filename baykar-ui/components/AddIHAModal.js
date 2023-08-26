import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { rentIHA } from "@/actions/renting";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { createIHA } from "@/actions/iha";

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

const weightUnitOptions = [
    { value: 1, label: "KG" },
    { value: 2, label: "TON" },
];

const ihaCategoryOptions = [
    { value: 0, label: "IHA0" },
    { value: 1, label: "IHA1" },
    { value: 2, label: "IHA2" },
    { value: 3, label: "IHA3" },
];

export default function AddIHA({ open, setOpen, refreshIHAs }) {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [weight, setWeight] = useState(0);
    const [weightUnit, setWeightUnit] = useState(1);
    const [category, setCategory] = useState(0);

    const handleClose = () => setOpen(false);

    const addIHA = async () => {
        let ihaData = {
            brand: brand,
            model: model,
            category: category,
            weight: weight,
            weight_unit: weightUnit,
        };
        const response = await createIHA(ihaData);
        if (response.status === 201) {
            refreshIHAs();
            toast.success("IHA Successfully created");
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
                        Add IHA
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            margin="normal"
                            id="brand"
                            label="Brand"
                            name="text"
                            sx={{ mb: 1 }}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            id="model"
                            label="Model"
                            name="text"
                            sx={{ mb: 1 }}
                            onChange={(e) => setModel(e.target.value)}
                        />
                        <Box sx={{ width: "200px", mb: 1 }}>
                            <Select
                                placeholder="Select IHA Category"
                                options={ihaCategoryOptions}
                                isClearable
                                onChange={(e) => setCategory(e ? e.value : null)}
                            />
                        </Box>
                        <TextField
                            margin="normal"
                            id="weight"
                            label="Weight"
                            name="weight"
                            type="number"
                            sx={{ mb: 1 }}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Box sx={{ width: "200px", mb: 1 }}>
                            <Select
                                placeholder="Select Weight Unit"
                                options={weightUnitOptions}
                                isClearable
                                onChange={(e) => setWeightUnit(e ? e.value : null)}
                            />
                        </Box>
                        <Button variant="contained" color="success" onClick={() => addIHA()}>
                            Add
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
