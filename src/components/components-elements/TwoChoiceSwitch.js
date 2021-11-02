import React from 'react'
import { Switch } from '@mui/material'
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const MaterialUISwitch = styled(Switch)(({ theme, ...otherProps }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(calc(100% - 6px))',
        '& .MuiSwitch-thumb:before': {
        backgroundImage: otherProps.firstIcon,
        backgroundSize: "20px 20px",
        },
        '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
    },
    },
    '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main :theme.palette.primary.main,
    width: 32,
    height: 32,
    '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: otherProps.secondIcon,
        backgroundSize: "20px 20px",
    },
    },
    '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: '30px',
    },
}));

export default MaterialUISwitch
