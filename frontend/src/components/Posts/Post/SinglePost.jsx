import { Box, Card, CardContent, Grow, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { postStyles } from "./style";
import image from '../../../images/logo192.png'

export default function SinglePost({ item}) {
  const classes = postStyles();
  return (
    <Grow in>
      <Card>
        <Box className={classes.cardImageContainer}>
          <img
            src={item.imageFileSet}
            alt={item.title}
            className={classes.responsiveImg}
          />
        </Box>
        <CardContent>
          <Link to={`/posts/${item._id}`} className={classes.Link}>
            <Typography variant='body1' component="h6" color='textPrimary'>
              {item.title}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grow>
  );
}