import React, { useState } from 'react';
import { Box, Typography, Popover, Card } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export default function DealsCellRenderer(props: GridRenderCellParams) {
  const deals =
    (props.value as Array<{ client: string; value: number; status: string }>) ||
    [];
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'deals-popover' : undefined;

  const totalValue = deals.reduce((acc, deal) => acc + (deal.value || 0), 0);
  const summaryText =
    deals.length > 0 ? `${deals.length} deals ($${totalValue})` : 'No deals';

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
            // textAlign: 'center',
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
            Deals Details
          </Typography>
          <Box>
            {deals.length > 0 ? (
              deals.map((deal, index) => (
                <Typography key={index} variant="body2">
                  Client: {deal.client}, Value: ${deal.value}, Status:{' '}
                  {deal.status}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No deals available.</Typography>
            )}
          </Box>
        </Card>
      </Popover>
    </>
  );
}
