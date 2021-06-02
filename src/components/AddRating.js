import StarRatings from "react-star-ratings";
import {Grid,Card,TextField, CardContent, Typography, Button} from '@material-ui/core'
import {useState} from 'react';
 export default function AddRating(props) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
     const handleCommentChange = (e) => {
         setComment(e.target.value);
     }
     const handleRatingChange = (newRating, name) => {
         setRating(newRating)
     }

     function onSubmit(e){
         e.preventDefault();
        props.addRating({rating,comment})
        setComment('');
        setRating(0);
     }
     return (
         <Grid container spacing={0} direction="column" alignItems="left" className="topMargin" justify="left">
             <Grid item>
                 <Card variant="outlined">
                     <CardContent>
                         <Typography>Add rating</Typography>
                        <form className="form-group">
                            <StarRatings starDimension='20px' rating={rating} changeRating={handleRatingChange} starSpacing='0px'/><br></br>
                            <TextField id="comment" label="Comment" multiline size="small" rows={3} onChange={handleCommentChange}/>
                            <div className="marginButton"><Button variant="contained" color="primary" onClick={onSubmit}>Add</Button></div>
                        </form>
                     </CardContent>
                     
                 </Card>
             </Grid>
         </Grid>
     )
 }