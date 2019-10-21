import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function CountryCard(props) {
  const [image, setImage] = useState(
    "http://www.bialka-arabians.pl/img/load.gif"
  );
  // const [unsplashImage, setUnsplashImage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    var config = {
      headers: {
        Authorization:
          "Client-ID 1ba319b5158ea1bcd626904749d502a17fd754422628c90f72ff61c84a562d7e"
      }
    };

    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${props.country.name.split("(")[0]}`,
        config
      )
      .then(res => {
        if (!res.data.total) {
          newApiCall();
        } else {
          const small = res.data.results[0].urls.small;
          setImage(small);
          // setUnsplashImage(true);
          // console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
        newApiCall();
        // setUnsplashImage(false);
      });
  }, [props.page]);

  const newApiCall = () => {
    const key = "13977432-b51ed35313c5ffc342c891316";
    axios
      .get(
        `https://pixabay.com/api/?key=${key}&q=${props.country.name}&image_type=photo`
      )
      .then(res => {
        const small = res.data.hits[0].webformatURL;
        setImage(small);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link to={`/country/${props.country.name}`}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image}
            title="Contemplative Reptile"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.country.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
