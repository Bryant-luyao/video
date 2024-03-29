import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GetPoints, GetIfChecked, Checkin } from './service.js';

const Points = ({ user }) => {
  const [points, setPoints] = useState(0);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      const points = await GetPoints(user.ID);
      const checked = await GetIfChecked(user.ID);
      setPoints(points);
      setChecked(checked);
    };

    loadData();
  }, [user.ID]);

  const handleCheckin = async () => {
    if (!checked) {
      const newPoints = await Checkin(user.ID);
      setPoints(newPoints);
      setChecked(true);
    }
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={2} marginBottom={"30px"} marginTop={"30px"}>
        <Grid item>
          <AccountCircleIcon style={{ color: '#fa0', fontSize: '3rem' }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.Email}</Typography>
        </Grid>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <MonetizationOnIcon style={{ color: '#fa0' }} />
          <Typography variant="h6" style={{ color: '#fa0', marginLeft: '5px', marginRight: '20px' }}>{points}</Typography>
          {!checked && <Button variant="contained" onClick={handleCheckin} style={{ backgroundColor: '#fa0', color: '#000', fontSize: '0.8rem', padding: '3px 6px' }}>
            Daily Bonus
          </Button>}
          <Button variant="contained" onClick={() => {navigate('/store')}} style={{ backgroundColor: '#fa0', color: '#000', marginLeft: '10px',  fontSize: '0.8rem', padding: '3px 6px' }}>
            TOP UP
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Points;
