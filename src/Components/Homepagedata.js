import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Homepagedata = (props) => {
const navigate = useNavigate()


const joinroom = () =>
{
  
  navigate('/chat/'+props.data.id)

}

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
      const card = (
        <React.Fragment>
          <CardContent>
           
            <Typography variant="h5" component="div">
            {props.data.subject}
            </Typography>
          
            <Typography variant="body2">
             {props.data.subs}
              
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={joinroom}>Join Room</Button>
          </CardActions>
        </React.Fragment>
      );
  return (
    <div>
<div>
<Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>


</div>
<br/>
    </div>
  )
}

export default Homepagedata