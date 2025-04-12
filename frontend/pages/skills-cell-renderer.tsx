import React, { useState } from 'react';
import { Popover, Card, Typography, Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export default function SkillsCellRenderer(props: GridRenderCellParams) {
  const skills = (props.value as string[]) || [];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'skills-popover' : undefined;

  const displayText = skills.join(', ');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
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
          }}
        >
          {displayText}
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
        <Card sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Box>
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Typography key={index} variant="body2">
                  {skill}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No skills available.</Typography>
            )}
          </Box>
        </Card>
      </Popover>
    </>
  );
}
