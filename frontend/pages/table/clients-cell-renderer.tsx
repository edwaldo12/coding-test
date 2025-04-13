import React, { useState } from 'react';
import { Box, Typography, Popover, Card } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

const ClientsCellRenderer: React.FC<GridRenderCellParams> = (
  props: GridRenderCellParams
) => {
  const clients =
    (props.value as Array<{
      name: string;
      industry: string;
      contact: string;
    }>) || [];
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'clients-popover' : undefined;

  const summaryText =
    clients.length > 0 ? `${clients.length} clients` : 'No clients';

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onClick={handleClick}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#00729b',
            width: '100%',
          }}
        >
          {summaryText}
        </Typography>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Card sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" gutterBottom>
            Clients Details
          </Typography>
          <Box>
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <Typography key={index} variant="body2">
                  Name: {client.name} – {client.industry} ({client.contact})
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No clients available.</Typography>
            )}
          </Box>
        </Card>
      </Popover>
    </>
  );
};

export default ClientsCellRenderer;
