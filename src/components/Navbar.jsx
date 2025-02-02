import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#01204E", padding: "10px 0" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.6rem",
              "&:hover": { color: "#dbe2ef" },
            }}
          >
            Task Manager
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff", px: 3 }}
              >
                Log Out
              </Button>
            </motion.div>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List
          sx={{
            width: "180px",
            backgroundColor: "#01204E",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingTop: 2,
          }}
        >
          <ListItem
            sx={{ marginTop: "30px" }}
            button
            component={Link}
            to="/signup"
            onClick={() => setOpen(false)}
          >
            <ListItemText
              primary="Signup"
              sx={{ color: "#fff", textAlign: "center", fontSize: "1.2rem" }}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              setOpen(false);
            }}
          >
            <ListItemText
              primary="Log Out"
              sx={{ color: "#fff", textAlign: "center", fontSize: "1.2rem" }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
