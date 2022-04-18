import React, { useEffect } from 'react'
import { postStyles } from './style';
import  { useState } from 'react'
import { Button, Container,Grid, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core';
import joi from "joi-browser"
import { TextInputField } from '../../common/formComponents';
import FileBase64 from 'react-file-base64'
import { UpdatePost, GetPostDetailsById } from '../../../HttpServices/Posts.js';
import {toast} from "react-toastify";
import { useParams } from 'react-router-dom';


export default function EditPost(props) {
  const classes=postStyles();
  const {id}=useParams();
  const[formValidationError,setFormValidationError]=useState('')

 // const [updated, setUpdated] = useState(false);
  
    const[state,setState]=useState({
        data:{
            title:"",
            imageFileSet:"",
            description:""
        },
        errors:{


        }
    });
    
    const schema={
        title:joi.string().required().label("Title").min(5),
        imageFileSet : joi.string().required().label("Image"),
        description: joi.string().required().label("Description"),

    }

    const handleOnChange=({target})=>{
        const{data,errors}=state
        const {error}=joi.validate(data[target.name],schema[target.name],{abortEarly:true});
        
        !error?(errors[target.name]=""):(errors[target.name]=error.details[0].message);
        data[target.name]=target.value;
        setState({data,errors});
    }

    const validate = ()=>{
        let errorObj = {};
        let {error} = joi.validate(state.data,schema,{abortEarly:false});

        !error?(errorObj={}) : error.details.map((item)=>{
            (errorObj[item.path] = item.message)
        });
        return errorObj
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        let errors = validate();
        let {data}=state;
        setState({data,errors});

        ///app post request logic
        //console.log("data",data);

        if(Object.keys(errors).length===0 && errors.constructor===Object){

        UpdatePost({id,data}).then(()=>{
            
            toast.success("edited successfully")
            setState({
                data:{
                    title:"",
                    imageFileSet:"",
                    description:"",
                },errors:{},
            });
            props.history.push('/posts')
        }).catch((e)=>{
            console.log("error",e);
            setFormValidationError(e.message);
        });
    }
    };



    // const populateFieldWithData = async()=>{
    //   try{
    //       const f = await GetPostDetailsById({id});

    //       const postData = f.data;
    //       const { data, errors } = state;
    //       data.title = postData.title;
    //       data.imageFileSet = postData.imageFileSet;
    //       data.description = postData.description;
    //       setState({ data, errors });
    //   }catch(e){
    //     console.log("error", e);
    //     if (e.response.status) {
    //       console.log("hgghhghh");
    //       props.history.push("/posts");

    //   }

    //   }
    // }

    // const populateFieldWithData = (() =>
    // GetPostDetailsById({ id }))
    //   .then(({ data: postData }) => {
    //     console.log("data", postData);
    //     const { data, errors } = state;
    //     data.title = postData.title;
    //     data.imageFileSet = postData.imageFileSet;
    //     data.description = postData.description;
    //     setState({ data, errors });
    //   })
    //   .catch((e) => {
    //     console.log("error", e);
    //     if (e.response.status) {
    //       console.log("hgghhghh");
    //       props.history.push("/posts");
    //     }
    //   });

    // useEffect(()=>{
    //   GetPostDetailsById({id}).then(({data:item})=>{
    //   const {data,errors} = state;
    //   data.title=item.title
    //   data.imageFileSet=item.imageFileSet
    //   data.description = item.description

    //   setState({data,errors});

    // }).catch(()=>{

    // })
    // },[])

     useEffect( async () => {
       //console.log("gggg",id);
       try{
          const f = await GetPostDetailsById({id});
          
          const postData = f.data.data;
          const { data, errors } = state;
          data.title = postData.title;
          data.imageFileSet = postData.imageFileSet;
          data.description = postData.description;
          setState({ data, errors });
      }catch(e){
        console.log("error", e);
        if (e.response.status) {
          
          props.history.push("/posts");

      }

      }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  return (

    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          
          <img src={state.data.imageFileSet} alt={state.data.title} className={classes.responsiveImg}/> 

        </Grid>
        <Grid item xs={12} sm={6}>

          <Grid container >
            <Grid item xs={12} >
                <Box mt={2} mb={2}>
                    <Typography variant="h6" color="primary" align="center">
                         Edit Blog Post
                    </Typography>
                    <Typography variant="subtitle2" color="error" align="center">
                         {formValidationError}
                    </Typography>
                </Box>
                <form onSubmit={handleOnSubmit}>
                    <Box mt={2} mb={1}>
                        <TextInputField name='title' state={state.data} errors={state.errors}   onChange={handleOnChange}/>
                    </Box>
                    <Box mt={2} mb={1}>
                        <FileBase64 onDone={(e)=>{
                            let {data,errors}=state;
                            data.imageFileSet=e.base64;
                            errors.imageFileSet="";
                            setState({data,errors});
                        }}/>
                        <Typography variant='subtitle2' color="error">
                            {state.errors.imageFileSet?state.errors.imageFileSet:null}
                        </Typography>
                    </Box>
                    <Box mt={2} mb={1}>
                        <TextInputField name='description' state={state.data}   errors={state.errors} onChange={handleOnChange} multiline rows={4}/>
                    </Box>
                    <Box mt={2} mb={1}>
                        <Button color='primary' variant='outlined' type="submit" fullWidth>{" "} Submit{" "}</Button>
                    </Box>
                </form>
            </Grid>
        </Grid>

        </Grid>
      </Grid>

    </Container>
    
  );
}
