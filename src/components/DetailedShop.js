import { Avatar, Card, Button, CardActionArea, CardContent, CardMedia, makeStyles, Paper, Typography } from "@material-ui/core";
import {Link} from 'react-router-dom'
import NotLoggedRating from './NotLoggedRating';
import Chip from '@material-ui/core/Chip';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import Rating from './Rating';
import { useLocation } from "react-router";
import AddRating from "./AddRating";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 180,
    },
  });
  
export default function DetailedShop(props){
    const classes = useStyles()
    const {state} = useLocation();
    var renderAddRating = null;
    var editButton = null;
    function getAverageScore(shop){
        let sum=0;
        shop.ratings.map(rating => {
            sum+=rating.rating;
        })
        const avg = Math.round((sum/shop.ratings.length)*10)/10;
        if(avg){
            return avg;
        }
        else{
            return 0;
        }
    }
    const averageScore = getAverageScore(state.shop);
    console.log(averageScore)
    const addRating = (rating) => {
        props.addRating(rating,state.shop.id);
    }
    if(props.user){
        renderAddRating=(<AddRating addRating={addRating}/>);
        if(props.user.id == state.shop.owner.id ){
            editButton = (<Link to={{pathname:`/edit`, state:{shop:state.shop}}}><Button variant="contained" style={{backgroundColor:'darkorange', marginLeft:'3px'}} >Edit</Button></Link>)

        }
    }
    else{
        renderAddRating=(<NotLoggedRating/>)
    }
    
    return (
        
       <Grid container spacing={2} className="details">
           
           <Grid item xs={8}>
           <Link to="/">
            <Button variant="contained" color="primary">Back</Button>
            
        </Link>
        {editButton}
        
               <Card>
                   <CardActionArea>
                       <CardMedia image={state.shop.image_path} className={classes.media}/>
                   </CardActionArea>
                   <CardContent>
                       <Typography gutterBottom variant="h4" component="h2">
                           {state.shop.name}
                       </Typography>
                       <Chip size="medium" label={state.shop.type.name} color="primary"></Chip>
                       <Chip size="medium" label={state.shop.shipping_location} color="warn"></Chip>
                       <Typography variant="body2" color="textSecondary" component="p">
                           {state.shop.description}
                       </Typography>

                   </CardContent>
               </Card>
               <Grid style={{margin:'10px', textAlign:'left'}}>
               {state.shop.ratings.map((rating)=>(
                   <Rating key={rating.id} rating={rating}></Rating>
               ))}
           </Grid>
           </Grid>
           <Grid item xs={4}>
               <Typography align="center" variant="h4" component="h2">Average Score:</Typography>
               <Typography  align="center" gutterBottom variant="h1" component="h1">{averageScore}</Typography>
               <StarRatings rating={averageScore} starRatedColor="#FFBF00" ></StarRatings>
            {renderAddRating}
           </Grid>
           
           
       </Grid>
    )
}