import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon,
  Typography,
  Menu,
  MenuItem,
  Button,
  CardActions,
} from "@material-ui/core";
import {MoreVert,Edit,DeleteForever} from "@material-ui/icons";



import { postStyles } from "./style";
import { DeletePostById, GetPostDetailsById } from "../../../HttpServices/Posts";
import { useParams,Link } from "react-router-dom";
import DialogComponent from "../../common/DialogComponent";
import { toast } from "react-toastify";


export default function SinglePostDetails(props) {
  const classes = postStyles();
  const[data,setData]=useState({});
  const{id}=useParams();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const[dialogOpen,setDialogOpen]=useState(false);



  useEffect(()=>{

    GetPostDetailsById({id}).then(({data:{data}})=>{
      setData(data);
      console.log("data",data);
    }).catch((e)=>{
      console.log("errror",e);
      if(e.response.status === 404){
        props.history.push("/posts");
      }
    });
    
  },[]);
  
  const DialogContent = ()=> <Grid container>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center" color="primary" gutterBottom>Are you sure you want to delete ?</Typography>
          <Typography variant="h5" align="center" color="error" gutterBottom>{data.title}</Typography>
        
        </CardContent>
        <CardActions style={{justifyContent:"center"}}>
          <Box mt={1} mb={1}>
            <Button variant="outlined" color='primary' style={{marginRight:"8px"}} onClick={()=>setDialogOpen(false)}>Cancel</Button>
            <Button variant="outlined" color='secondary' onClick={()=>DeletePostById({id}).then(()=>{
                 setDialogOpen(false);
                 toast.success("post Deleted successfully");
                 props.history.push('/posts')

            })
            }>
              Delete</Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  </Grid>

  const formatDate = (str) =>{
    let date= new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return (
    <Container>
      <DialogComponent
      openState={dialogOpen}
      handleDialogClose={()=>setDialogOpen(false)}
      content={<DialogContent/>}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem 
        onClick={handleClose} 
        color='primary' 
        component={Link} 
        
        to={`/posts/edit/${data._id}`} >
          <Button startIcon={<Edit/>}color="primary">Edit
          </Button>
          </MenuItem>
        <MenuItem  color='secondary' >
          <Button startIcon={<DeleteForever/>}color="secondary" onClick={()=>{handleClose();setDialogOpen(true)}}>Delete</Button>
        </MenuItem>
      </Menu>
      
      <Grid container>

        {!Object.keys(data).length? (<Grid item xs='12'>
          <Box p={5} mt={5} display="flex"
          justifyContent="center" alignItems="center"><CircularProgress/></Box></Grid>) : (
        <Grid item xs={12} sm={8}>
            <Card>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant='h6' color='textPrimary'>
                      {data.title}
                    </Typography>
                    {data.publishedAt ? (<Typography variant='body1' color='textSecondary'>
                      {formatDate(data.publishedAt)}
                    </Typography>) : null}
                    
                    
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                    aria-controls="basic-menu"
                    aria-haspopup='true'
                    onClick={handleClick}
                    >
                      <MoreVert />
                    </IconButton>
                      
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <img
                src={data.imageFileSet}
                alt={data.title}
                className={classes.responsiveImg}
              />
              <CardContent>
                <Typography variant='body1' component="h6" color='textSecondary'>
                  {data.description}
                  </Typography>
                
              </CardContent>
            </Card>
          </Grid>
          )
          }
        
          
          
      </Grid>
    </Container>
  );
}