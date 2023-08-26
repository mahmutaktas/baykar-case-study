import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { deleteIHA, getIHAList } from "@/actions/iha";
import { Button, TextField } from "@mui/material";
import Select from "react-select";
import RentIHA from "@/components/RentModal";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import AddIHA from "@/components/AddIHAModal";
import UpdateIHA from "@/components/UpdateIHAModal";
import Link from "next/link";
import { useRouter } from "next/router";

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

const headCells = [
    {
        id: "model",
        disablePadding: true,
        label: "Model",
    },
    {
        id: "brand",
        disablePadding: false,
        label: "Brand",
    },
    {
        id: "category",
        disablePadding: false,
        label: "Category",
    },
    {
        id: "weight",
        disablePadding: false,
        label: "Weight",
    },
    {
        id: "weight_unit",
        disablePadding: false,
        label: "Weight Unit",
    },
    {
        id: "rent",
        disablePadding: false,
        label: "",
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const router = useRouter();

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("pk");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOpenAddIHAModal, setIsOpenAddIHAModal] = useState(false);

    const [ihaList, setIhaList] = useState([]);
    const [ihaCount, setIhaCount] = useState(0);
    const [controller, setController] = useState({
        page: 0,
        rowsPerPage: 5,
    });

    const [filters, setFilters] = useState({});

    useEffect(() => {
        getData();
    }, [controller, order, orderBy]);

    const getData = async () => {
        let ordering = order == "asc" ? orderBy : `-${orderBy}`;

        let filtersStr = "";

        if (Object.keys(filters).length > 0) {
            for (const [key, value] of Object.entries(filters)) {
                if (value || value === 0) {
                    filtersStr += `&${key}=${value}`;
                }
            }
        }

        const response = await getIHAList(
            controller.rowsPerPage,
            controller.page * controller.rowsPerPage,
            ordering,
            filtersStr
        );
        try {
            if (response.statusText === "OK") {
                const data = await response.json();
                setIhaList(data.results);
                setIhaCount(data.count);
            } else {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setController({
            ...controller,
            page: newPage,
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setController({
            ...controller,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        });
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const openAddIHAModal = () => {
        setIsOpenAddIHAModal(true);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        router.push("/");
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ihaCount) : 0;

    return (
        <Box sx={{ width: "90%", m: 2 }}>
            <ToastContainer />
            <AddIHA
                open={isOpenAddIHAModal}
                setOpen={(value) => setIsOpenAddIHAModal(value)}
                refreshIHAs={() => getData()}
            />

            <Box
                sx={{
                    width: "100%",
                    borderBottom: "1px solid grey",
                    mb: 4,
                    pb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Link
                        href={"/iha"}
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            marginRight: "2rem",
                        }}
                    >
                        IHA
                    </Link>
                    <Link
                        href={"/renting"}
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            marginRight: "2rem",
                        }}
                    >
                        Renting
                    </Link>
                </Box>
                <Button variant="contained" color="error" onClick={() => logout()}>
                    Logout
                </Button>
            </Box>

            <Paper sx={{ width: "100%", mb: 2 }}>
                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            margin="normal"
                            id="brand"
                            label="Brand"
                            name="text"
                            sx={{ mr: 1 }}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, brand__icontains: e.target.value }))
                            }
                        />
                        <TextField
                            margin="normal"
                            id="model"
                            label="Model"
                            name="text"
                            sx={{ mr: 1 }}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, model__icontains: e.target.value }))
                            }
                        />
                        <Box sx={{ width: "200px", mr: 1 }}>
                            <Select
                                placeholder="Select IHA Category"
                                options={ihaCategoryOptions}
                                isClearable
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, category: e ? e.value : null }))
                                }
                            />
                        </Box>
                        <Box sx={{ width: "200px", mr: 1 }}>
                            <Select
                                placeholder="Select Weight Unit"
                                options={weightUnitOptions}
                                isClearable
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, weight_unit: e ? e.value : null }))
                                }
                            />
                        </Box>
                        <Button variant="contained" onClick={() => getData()}>
                            Filter
                        </Button>
                    </Box>

                    <Button
                        sx={{ mr: 2 }}
                        variant="contained"
                        color="success"
                        onClick={() => openAddIHAModal()}
                    >
                        Add IHA
                    </Button>
                </Box>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={ihaCount}
                        />
                        <TableBody>
                            {ihaList.map((row, index) => {
                                return <TableRowElement row={row} refreshList={() => getData()} />;
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    onPageChange={handlePageChange}
                    page={controller.page}
                    count={ihaCount}
                    rowsPerPage={controller.rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

const TableRowElement = ({ row, refreshList }) => {
    const [ihaModalOpen, setIhaModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const openRentIHAModal = () => {
        setIhaModalOpen(true);
    };

    const openUpdateIHAModal = () => {
        setIsUpdateModalOpen(true);
    };

    const deleteIHAFnc = () => {
        Swal.fire({
            title: "Do you want to delete the IHA",
            confirmButtonColor: "red",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = await deleteIHA(row.pk);
                if (response.status === 204) {
                    Swal.fire("IHA successfully deleted!", "", "success");
                    refreshList();
                } else if (response.status !== 500) {
                    let errorMessage = await response.json();
                    Swal.fire(JSON.stringify(errorMessage), "", "warning");
                } else {
                    Swal.fire("This IHA rented", "", "warning");
                }
            }
        });
    };

    return (
        <>
            <TableRow hover tabIndex={-1} key={row.pk} sx={{ cursor: "pointer" }}>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.category_str}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.weight_unit_str}</TableCell>
                <TableCell align="right">
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        color="success"
                        onClick={() => openRentIHAModal()}
                    >
                        Rent
                    </Button>
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => openUpdateIHAModal()}
                    >
                        Update
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteIHAFnc()}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <RentIHA open={ihaModalOpen} setOpen={(value) => setIhaModalOpen(value)} iha={row} />
            <UpdateIHA
                open={isUpdateModalOpen}
                setOpen={(value) => setIsUpdateModalOpen(value)}
                iha={row}
                refreshIHAs={() => refreshList()}
            />
        </>
    );
};
