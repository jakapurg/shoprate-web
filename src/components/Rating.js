import Grid from '@material-ui/core/Grid'
import StarRatings from 'react-star-ratings';

export default function Rating(props){
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{margin:0, textAlign:'left'}}>{props.rating.user.email}</h4>
                <p style={{textAlign:'left', margin:0}}>{props.rating.comment}</p>
                <p style={{margin:0}}><StarRatings starDimension='12px' starSpacing='0px' rating={props.rating.rating}/></p>
                <p style={{textAlign:'left', color:"gray", margin:0}}>{props.rating.created_at}</p>
            </Grid>
        </Grid>
    )
}