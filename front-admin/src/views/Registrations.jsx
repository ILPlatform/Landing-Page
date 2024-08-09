import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  Container,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem as SelectItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { callFunction } from "../firebase";

const getColor = (status) => {
  switch (status) {
    case "waiting_list":
      return "warning";
    case "accepted":
      return "success";
    case "cancelled":
      return "secondary";
    default:
      return "primary";
  }
};

const Registrations = () => {
  const { event } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callFunction("front_get_registration_mac")({ event: event });
        console.log(response);
        setRegistrations(response?.data?.response);
      } catch (error) {
        console.error("Error fetching registrations", error);
      }
    };
    fetchData();
  }, [event]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await callFunction("front_update_registration_status")({ id, status: newStatus });
      if (response?.data?.status === 200) {
        setRegistrations((prev) =>
          prev.map((registration) => (registration.id === id ? { ...registration, status: newStatus } : registration)),
        );
      }
      handleClose();
    } catch (error) {
      console.error("Error updating registration status", error);
      handleClose();
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesStatus = filterStatus ? registration.status === filterStatus : true;
    const matchesSearch = searchQuery
      ? registration.parentFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        registration.parentLastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        registration.childFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        registration.childLastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        registration.parentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        registration.parentPhone.includes(searchQuery)
      : true;
    return matchesStatus && matchesSearch;
  });

  const handleEmailAll = () => {
    const emails = filteredRegistrations.map((reg) => reg.parentEmail).join(",");
    window.location.href = `mailto:?bcc=${emails}`;
  };

  return (
    <Container component={Paper} style={{ padding: "16px", marginTop: "48px" }}>
      <Typography variant="h4" gutterBottom>
        Registrations for Event{" "}
        <a href={`http://localhost:3000/meet_and_code/${event}`} target="_blank">
          {event}
        </a>
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={handleFilterChange} label="Status">
            <SelectItem value="">
              <em>All</em>
            </SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="waiting_list">Waiting List</SelectItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginLeft: "16px", flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEmailAll}
          style={{ marginLeft: "16px", whiteSpace: "nowrap" }}
        >
          Email All
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Parent Name</TableCell>
            <TableCell>Child Name</TableCell>
            <TableCell>Child Birthday</TableCell>
            <TableCell>Parent Email</TableCell>
            <TableCell>Parent Phone</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRegistrations
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((registration) => (
              <TableRow key={registration.id}>
                <TableCell>{new Date(registration.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  {registration.parentFirstName} {registration.parentLastName}
                </TableCell>
                <TableCell>
                  {registration.childFirstName} {registration.childLastName}
                </TableCell>
                <TableCell>{registration.childBirthday}</TableCell>
                <TableCell>{registration.parentEmail}</TableCell>
                <TableCell>{registration.parentPhone}</TableCell>
                <TableCell>{registration.comments}</TableCell>
                <TableCell>
                  <Chip label={registration?.status} color={getColor(registration?.status)} variant="outlined" />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, registration.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem
                      onClick={() => handleStatusChange(selectedId, "accepted")}
                      disabled={registration.status === "accepted"}
                    >
                      Accept
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleStatusChange(selectedId, "cancelled")}
                      disabled={registration.status === "cancelled"}
                    >
                      Cancel
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleStatusChange(selectedId, "waiting_list")}
                      disabled={registration.status === "waiting_list"}
                    >
                      Move to Waiting List
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Registrations;
