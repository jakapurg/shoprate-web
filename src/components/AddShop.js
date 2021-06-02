import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Card, Grid, MenuItem, Select, InputLabel, Button} from '@material-ui/core'
const useStyles = makeStyles({
    root:{
        minWidth:'300px'
    },
    marginTopBottom:{
        margin:"10px 0px"
    }
})
export default function AddShop(props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shipping_location, setShippingLocation] = useState('WORLDWIDE');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');


    function onSubmit(e){
        e.preventDefault();
        if(!name){
            alert('Enter name')
            return;
        }
        if(!description){
            alert('Enter description')
            return;
        }
        if(!shipping_location){
            alert('Enter shipping location');
            return;
        }
        if(!type){
            alert('Enter type')
            return;
        }
        props.onAdd({name,description,shipping_location,type,image});
        setName('');
        setDescription('');
        setShippingLocation('');
        setType('');

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

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item xs={10}>
                <Card variant="outlined" className={classes.root}>
                    <form className="form-group">
                        <TextField id="name" label="Name" onChange={handleNameChange}/><br/>
                        <TextField id="description" label="Description" multiline rows={4} onChange={handleDescriptionChange}/><br/>
                        <input type="file" id="image" onChange={handleImageChange}/>
                        <div className={classes.marginTopBottom}>
                            <InputLabel id="shipping_location_label">Shipping Location</InputLabel>
                            <Select  labelId="shipping_location_label" id="shipping_location" onChange={handleShippingLocationChange}>
                                <MenuItem value="WORLDWIDE">Worldwide</MenuItem>
                                <MenuItem value="EU">European Union</MenuItem>
                                <MenuItem value="SLOVENIA">Slovenia</MenuItem>
                            </Select>
                        </div>
                        
                        <div className={classes.marginTopBottom}>
                            <InputLabel id="type_label">Type</InputLabel>
                            <Select labelId="type_label" id="type" onChange={handleTypeChange}>
                                <MenuItem value="TECH">Tech</MenuItem>
                                <MenuItem value="FASHION">Fashion</MenuItem>
                                <MenuItem value="SPORTS">Sports</MenuItem>
                                <MenuItem value="HEALTH_BEAUTY">Health and Beauty</MenuItem>
                                <MenuItem value="OTHER">Other</MenuItem>
                            </Select>
                        </div>
                        <div className="marginButton">
                            <Button variant="contained" color="primary" onClick={onSubmit}>Add shop</Button>

                        </div>
                        
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}