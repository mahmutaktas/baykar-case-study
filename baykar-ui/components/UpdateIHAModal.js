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
import { updateIHA } from "@/actions/iha";

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

export default function UpdateIHA({ iha, open, setOpen, refreshIHAs }) {
    const [brand, setBrand] = useState(iha.brand);
    const [model, setModel] = useState(iha.model);
    const [weight, setWeight] = useState(iha.weight);
    const [weightUnit, setWeightUnit] = useState(iha.weight_unit);
    const [category, setCategory] = useState(iha.category);

    const handleClose = () => setOpen(false);

    const editIHA = async () => {
        let ihaData = {
            brand: brand,
            model: model,
            category: category,
            weight: weight,
            weight_unit: weightUnit,
        };
        const response = await updateIHA(iha.pk, ihaData);
        if (response.status === 200) {
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
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            id="model"
                            label="Model"
                            name="text"
                            sx={{ mb: 1 }}
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                        <Box sx={{ width: "200px", mb: 1 }}>
                            <Select
                                placeholder="Select IHA Category"
                                options={ihaCategoryOptions}
                                isClearable
                                value={ihaCategoryOptions.find((item) => item.value == category)}
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
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Box sx={{ width: "200px", mb: 1 }}>
                            <Select
                                placeholder="Select Weight Unit"
                                options={weightUnitOptions}
                                isClearable
                                value={weightUnitOptions.find((item) => item.value == weightUnit)}
                                onChange={(e) => setWeightUnit(e ? e.value : null)}
                            />
                        </Box>
                        <Button variant="contained" color="success" onClick={() => editIHA()}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
