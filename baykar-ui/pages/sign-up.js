import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { register } from "@/actions/auth";
import { useRouter } from "next/router";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password1 != password2) {
            toast.warn("Passwords do not match!");
            return;
        }

        let registerData = {
            email: email,
            password: password1,
            password2: password2,
            first_name: firstName,
            last_name: lastName,
        };
        let response = await register(registerData);
        if (response.status === 201) {
            toast.success("Successfully registered. Now redirecting to login");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            let errorMessage = await response.json();
            toast.error(JSON.stringify(errorMessage));
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <ToastContainer />
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(baykar.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 1,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="first-name"
                                    label="First Name"
                                    name="first-name"
                                    autoComplete="first-name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last-name"
                                    label="Last Name"
                                    name="last-name"
                                    autoComplete="last-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Password Again"
                                    type="password"
                                    id="password2"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Register
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/" variant="body2">
                                            {"Already have an account? Login"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
