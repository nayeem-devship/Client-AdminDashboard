import React from 'react';
import './LoginPage.css';
import { Avatar, Box, Card, Typography } from '@mui/material';

function LoginPage() {
  return (
    <Box className='login_Page'>
    <Card sx={{minWidth:"22rem", p:"2rem", mx:"1rem"}}>
      <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Avatar>
          
        </Avatar>
        <Typography sx={{color:"inherit"}} variant='h5'>Login Page</Typography>
      </Box>
    </Card>
    </Box>
  )
}

export default LoginPage