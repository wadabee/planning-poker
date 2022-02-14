import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import PlayPoker from "./pages/PlayPoker";
import { AppBar, Toolbar, Typography } from "@mui/material";
import CreateRoom from "./pages/CreateRoom";

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Planning Poker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/play/:roomId" element={<PlayPoker />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
