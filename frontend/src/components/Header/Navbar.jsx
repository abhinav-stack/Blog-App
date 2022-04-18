import React, { useEffect, useState } from 'react'
import { AppBar,Typography,Button,Toolbar, Box, InputBase, Hidden, IconButton, CircularProgress } from '@material-ui/core'
import { NavbarStyles } from './NavbarStyle'
import image from '../../images/logo192.png'
import { PostAdd,Search, TrackChangesTwoTone } from '@material-ui/icons'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles'


const useStyle = makeStyles({
    link:{
        textDecoration:"none",

    }
})

export default function Navbar({searchPostData, handleSearchOnChange}) {
 const classes = NavbarStyles();

 const [isOnchange,setisOnchange]=useState(false);
 const[targetValue,setTargetValue] = useState("");

 useEffect(()=>{
     setisOnchange(false);

 },[searchPostData])



  return (
      <AppBar position="fixed">
        <Toolbar >
            <Link to="/" className={classes.link}>
            <Box className={classes.logoContainer}>
                <Hidden xsDown>
                <img src={image} alt="react blog" className={classes.logo}/>
                <Typography variant='h6' className={classes.title}>
                    React Blog
                </Typography>
                </Hidden>
            </Box>
            </Link>
            

            <div className={classes.grow}/>
            <div className={classes.search}>
                <div className={classes.searchIcon}>

                   {!isOnchange?<Search/>:<CircularProgress style={{
                       width:"20px",
                       height:"20px",
                       color:"white",
                   }}/>}
                </div>
                <InputBase 
                placeholder='search...'
                inputProps={{"aria-details":"search"}}
                classes={{
                    root:classes.inputRoot,
                    input:classes.inputInput,
                }}
                onChange={({target})=>{
                    handleSearchOnChange(target);
                    setisOnchange(true);
                    setTargetValue(target.value);
                } }
                />

                {targetValue.length>0?<Box className={classes.infoMsg}>
                    {searchPostData.length === 0 ? (<Typography variant="body2" align="center" color="error">No Record Found</Typography>):(<Typography variant="body2" align="center" color="inherit">Found {searchPostData.length} Found...</Typography>)}
                    
                    
                </Box>:null}

                 

                
            </div>
            


            <Hidden xsDown>
            <Link to="/posts/add" className={classes.link}>
                
            <Button 
            color="secondary" variant='contained' startIcon={<PostAdd/>} className={classes.button}>
            Add Post
            </Button>
            </Link>

            </Hidden>

            <Hidden smUp>
            <Link to="/posts/add" className={classes.linkbutton}>
            <IconButton color='inherit'>
            <PostAdd/>
            </IconButton>
            </Link>
            </Hidden>
        </Toolbar>
      </AppBar>


  )
}
