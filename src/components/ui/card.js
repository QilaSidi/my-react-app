import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

const Card = ({ children, className }) => {
  return (
    <MuiCard className={className} variant="outlined">
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
