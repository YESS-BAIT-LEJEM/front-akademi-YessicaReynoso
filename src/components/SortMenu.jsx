import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortMenu = ({ field, label, sortBy, sortOrder, onSort }) => {
  const isActive = sortBy === field;

  const handleClick = () => {
    onSort(field);
  };

  return (
    <>
      {label}
      <Tooltip title={`Ordenar por ${label}`}>
        <IconButton size="small" onClick={handleClick}>
          {isActive ? (
            sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
          ) : (
            <ArrowUpwardIcon fontSize="small" color="disabled" />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default SortMenu;
