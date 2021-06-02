import React, {useEffect, useState} from 'react';
import {IconButton, Toolbar, AppBar, Typography, Menu, MenuItem, List, ListItem, ListItemText} from '@material-ui/core'
import {Link} from 'react-router-dom';
import {AccountCircle} from '@material-ui/icons'
export default function NavigationBar(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    
    const menuId = 'primary-search-account-menu'
    var renderUserBar=null;
    var renderMenu = null; 
    var renderAdmin = null;
    var renderAdd = null;
    if(props.user){
      renderUserBar=(<div></div>);
      renderMenu=(<div></div>);
      renderAdd = (<Typography className="navLink" component={Link} to="/add-shop" variant="h6">Add shop</Typography>);
      console.log(props.user)
      if(props.user.role=='ADMIN'){
        renderAdmin = (<Typography className="navLink" component={Link} to="/admin" variant="h6">Admin</Typography>)
      }
    }
    else{
      renderUserBar=(<IconButton edge="end" aria-haspopup="true" color="inherit" onClick={handleProfileMenuOpen}>
      <AccountCircle/>
    </IconButton>);
      renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/login">Log In</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/register">Register</MenuItem>
        </Menu>
      )
    }
    
      return <AppBar position="static" className="navigation">
        <Toolbar>
          <Typography variant="h5" component={Link} className="navLink" to="/"> ShopRate</Typography>
          
          {/* Mogoce dodaj search box*/}
          <div className="grow">{renderAdmin}</div>
          {renderAdd}
          {renderUserBar}
        </Toolbar>
        {renderMenu}
      </AppBar>
        
      
}