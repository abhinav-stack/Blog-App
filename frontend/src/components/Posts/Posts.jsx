import React, { useEffect, useState } from 'react'
import SinglePost from './Post/SinglePost'
import {Box, CircularProgress, Container,Grid} from '@material-ui/core';
import { GetAllPosts } from '../../HttpServices/Posts';


export default function Posts({searchPostData}) {
  const[postData,SetPostData]=useState([]);

  const GetAllPostByRequest = ()=> GetAllPosts().then(({data:{data}})=>{
    SetPostData(data);
  }).catch((e) => {
    console.log("error",e.message);
  });

  useEffect(()=>{
    searchPostData.length===0?(GetAllPostByRequest()):(SetPostData(searchPostData));
  },[searchPostData])

  return (
    <Container>
      <Grid container spacing={1}>
        {postData.length?(
          postData.map((item,i)=>(
            <Grid item xs={12} sm={4} key={i}>
            <SinglePost item={item}/>
            </Grid>
          ))
        ):(
          <Grid item xs='12'>
          <Box p={5} mt={5} display="flex"
          justifyContent="center" alignItems="center"><CircularProgress/></Box></Grid>
        )}
        
      </Grid>
    </Container>
  );
}
