import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Our Free Courses
      </Typography>
      <Typography variant="body1" gutterBottom>
        Click on an event to view the registrations.
      </Typography>
      <List>
        <ListItem>
          <Link component={RouterLink} to="/registrations/code_geniuses2024" underline="hover">
            <ListItemText primary="Les Petits Génies du Code (10-12 years old, 10:00-12:00)" />
          </Link>
        </ListItem>
        <ListItem>
          <Link component={RouterLink} to="/registrations/code_explorers2024" underline="hover">
            <ListItemText primary="Explorateurs du Code (10-12 years old, 13:00-15:00)" />
          </Link>
        </ListItem>
        <ListItem>
          <Link component={RouterLink} to="/registrations/robotics_champions2024" underline="hover">
            <ListItemText primary="Champions de la Robotique (10-12 years old, 15:30-17:30)" />
          </Link>
        </ListItem>
      </List>
    </Container>
  );
};

export default Home;
