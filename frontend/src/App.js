import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Posts from "./Components/Posts/Posts";
import AddPost from "./Components/Posts/Post/AddPost";
import EditPost from "./Components/Posts/Post/EditPost";
import SinglePostDetails from "./Components/Posts/Post/SinglePostDetails";
import PageNotFound from "./Components/PageNotFound";
import { AppStyles } from "./AppBarStyle";
import { SearchPostData } from "./HttpServices/Posts";


export default function App() {
  const classes = AppStyles();

  const[searchPostData,setsearchPostData]=useState([]);

  const handleSearchOnChange=(target)=>{

     SearchPostData({data:target.value}).then(({data:{posts}})=>{
         setsearchPostData(posts);
     });

 }

  return (
    <div style={{}}>
      <Navbar searchPostData={searchPostData} handleSearchOnChange={handleSearchOnChange}/>
      <div className={classes.main}>
        <Switch>
          <Route exact path='/' render={(props) => <Posts searchPostData={searchPostData} {...props} />} />
          <Route exact path='/posts' render={(props) => <Redirect to='/' />} />
          <Route exact path='/posts/add' render={(props) => <AddPost {...props} />} />
          <Route
          exact 
            path='/posts/edit/:id'
            render={(props) => <EditPost {...props} />}
          />
          <Route
          exact 
            path='/posts/:id'
            render={(props) => <SinglePostDetails {...props} />}
          />
          <Route path='/*' render={(props) => <PageNotFound {...props} />} />
        </Switch>
        </div>
    </div>
  );
}