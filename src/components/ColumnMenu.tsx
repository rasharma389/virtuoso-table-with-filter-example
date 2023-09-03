import React, { useState } from "react";
import {
  Box,
  IconButton,
  Popover,
} from "@mui/material";
// import {ImMenu} from 'react-icons/im'
import MenuIcon from '@mui/icons-material/Menu';
import { ColumnsFilter } from "./Columns";
import {TbCalendarSearch} from 'react-icons/tb';

export const ColumnMenu = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}}>
    <Box>
      <IconButton size="small" aria-label="fingerprint" color="secondary" onClick={handleClick}>
        <MenuIcon fontSize="small"/>
      </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <ColumnsFilter {...props}/>
        </Popover>
    </Box>
    <Box>
      <IconButton size="small" aria-label="fingerprint" color="secondary" onClick={handleClick}>
        <TbCalendarSearch fontSize="medium"/>
      </IconButton>
    </Box>
  </Box>
  );
};
