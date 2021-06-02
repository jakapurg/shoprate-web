import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Grid,Card, MenuItem, Select, InputLabel, Button, TextField} from '@material-ui/core'
import { useLocation } from 'react-router';
const useStyles = makeStyles({
    root:{
        minWidth:'300px'
    },
    marginTopBottom:{
        margin:"10px 0px"
    }
})
export default function EditShop(props){
    const classes = useStyles();
    const {state} = useLocation();
    const [name, setName] = useState(state.shop.name);
    const [description, setDescription] = useState(state.shop.description);
    const [shipping_location, setShippingLocation] = useState(state.shop.shipping_location);
    const [image, setImage] = useState('');
    const [type, setType] = useState(state.shop.type.key);

    function onSubmit(e){
        e.preventDefault();
        console.log(type)
        props.onEdit({name,description,shipping_location,image,type},state.shop.id);
    }
    function onDelete(){
        props.onDelete(state.shop.id)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleShippingLocationChange = (e) => {
        setShippingLocation(e.target.value);
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    return(
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item xs={10}>
                <Card variant="outlined" className={classes.root}>
                    <form className="form-group">
                        <TextField id="name" label="Name" defaultValue={state.shop.name} onChange={handleNameChange}/>
                        <TextField id="description" label="Description" multiline rows={4} defaultValue={state.shop.description} onChange={handleDescriptionChange}/>
                        <input type="file" id="image" onChange={handleImageChange}/>
                        <div className={classes.marginTopBottom}>
                            <InputLabel id="shipping_location_label">Shipping location</InputLabel>
                            <Select labelId="shipping_location_label" id="shipping_location" defaultValue={state.shop.shipping_location} onChange={handleShippingLocationChange}>
                                <MenuItem value="WORLDWIDE">Worldwide</MenuItem>
                                <MenuItem value="EU">European Union</MenuItem>
                                <MenuItem value="SLOVENIA">Slovenia</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.marginTopBottom}>
                            <InputLabel id="type_label">Type</InputLabel>
                            <Select labelId="type_label" id="type" defaultValue={state.shop.type.key} onChange={handleTypeChange}>
                                <MenuItem value="TECH">Tech</MenuItem>
                                <MenuItem value="FASHION">Fashion</MenuItem>
                                <MenuItem value="SPORTS">Sports</MenuItem>
                                <MenuItem value="HEALTH_BEAUTY">Health and Beauty</MenuItem>
                                <MenuItem value="OTHER">Other</MenuItem>
                            </Select>
                        </div>
                        <div className="marginButton">
                            <Button variant="contained" color="primary" onClick={onSubmit}>Edit shop</Button>
                            <Button variant="contained" color="secondary" onClick={onDelete}>Delete shop</Button>
                        </div>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}