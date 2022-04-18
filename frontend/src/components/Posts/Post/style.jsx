import React from 'react'
import { makeStyles } from '@material-ui/core'








export const postStyles = makeStyles((theme) => ({
  responsiveImg:{
    width:"100%",
    heigth:"auto",
  },
  cardImageContainer:{
    width:"100%",
    height:"auto",
    maxHeight:"480px",
    overflowY:"hidden",
  },
  Link:{
    textDecoration:"none",
  },
}));
