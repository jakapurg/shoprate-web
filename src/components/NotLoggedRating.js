import {Grid, Card, CardContent, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

export default function NotLoggedRating(props){
    return (
        <Grid container spacing={0} direction="column" alignItems="center" className="topMargin" justify="center">
            <Grid item>
                <Card variant="outlined">
                    <CardContent>
                        <h3 style={{margin:0}}>Add rating</h3>
                        <p style={{textAlign:'center', color:'gray',margin:0}}>You have to be logged in to comment/rate</p>
                        <div className="marginButton">
                        <Link to="/login">
                             <Button variant="contained" color="primary">Log in</Button>
                        </Link>
                        </div>
                        
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}