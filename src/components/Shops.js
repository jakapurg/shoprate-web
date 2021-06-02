import Shop from './Shop'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { GridListTileBar, IconButton, InputBase } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
function Shops(props) {
    const [query, setQuery] = useState('')
    const [type, setType] = useState('');
    async function Search(e){
        props.search(query)
    }
    async function ShowAll(){
        props.showAll();
        setQuery('');
    }
    async function Filter(){
        props.filter(type)

    }
    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }
    const handleTypeChange = (e) => {
        setType(e.target.value);
    }
    return (

        <div className="shops">
            <div className="search">

                <InputBase onChange={handleSearchChange} placeholder="Search"/>
                <Button variant="contained" color="primary" startIcon={<SearchIcon/>} onClick={Search}></Button>
                <Button variant="contained" color="secondary" onClick={ShowAll}>Show all</Button>
                <div className="typeSelect">
                    <Select labelId="type_label" id="type" onChange={handleTypeChange}>
                                    <MenuItem value="TECH">Tech</MenuItem>
                                    <MenuItem value="FASHION">Fashion</MenuItem>
                                    <MenuItem value="SPORTS">Sports</MenuItem>
                                    <MenuItem value="HEALTH_BEAUTY">Health and Beauty</MenuItem>
                                    <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={Filter} startIcon={<FilterList/>}></Button>

                </div>
            </div>
            
            <GridList className="shopsGrid"  cellHeight={220} cols={4}>
            {props.shops.map((shop) => (
            <GridListTile key={shop.id}>
                <img src={shop.image_path}></img>
                <GridListTileBar title={shop.name} subtitle={<span>{shop.description}</span>} actionIcon={<IconButton component={Link} to={{pathname:`/shop/${shop.id}`, state:{shop:shop}}}   ><InfoIcon className="infoIcon"  /></IconButton>}/>
            </GridListTile>
        ))}
        </GridList>
        </div>
            
           
        
    )
}
export default Shops;