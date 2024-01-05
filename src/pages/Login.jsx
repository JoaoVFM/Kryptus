import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import Background from "../images/star.jpeg";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "admin" && password === "Admin123!") {
      setLoggedIn(true);
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
    setName("");
    setPassword("");
  };

  if (loggedIn) {
    return <Navigate to="/star-wars" />;
  }

  return (
    <div id="back" style={{ background: `url(${Background})` }}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={2} width={250}>
                <Typography variant="h6" align="center">
                  Identifique-se
                </Typography>

                <TextField
                  fullWidth
                  type="name"
                  label="Nome"
                  value={name}
                  onChange={handleNameChange}
                  required
                />

                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box width="100%" display="flex" justifyContent="center">
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
