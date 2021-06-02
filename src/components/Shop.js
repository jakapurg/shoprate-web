/*import{Button, CardActions, CardContent, Typography, Card, CardActionArea, GridListTile} from '@material-ui/core'
import {Link} from 'react-router-dom'
function Shop(props) {
    return (
        <Card className="shopCard">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.shop.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.shop.description}
                    </Typography>
                </CardContent>                
            </CardActionArea>
            <CardActions>
                <Link  to={{pathname:`/shop/${props.shop.id}`, state:{shop:props.shop}}}>
                    <Button size="small" color="primary">
                        Learn More
    </Button>
                </Link>
                
            </CardActions>
        </Card>
    )
    return <GridListTile key={tile.img}>
    <img src={tile.img} alt={tile.title} />
    <GridListTileBar
      title={tile.title}
      subtitle={<span>by: {tile.author}</span>}
      actionIcon={
        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
          <InfoIcon />
        </IconButton>
      }
    />
  </GridListTile>
}
export default Shop;*/