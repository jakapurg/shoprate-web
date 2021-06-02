import { useEffect, useState } from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DialogActions, IconButton, Dialog, DialogTitle,Select, DialogContent, TextField, Button,InputLabel, MenuItem } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
export default function Admin(props){
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [editedUser, setEditedUser] = useState(0);
    const getUsers = async function() {
        const res = await fetch('http://localhost:3001/user',{
            method:'GET',
            headers:{'Authorization':'Bearer '+props.token,
          'Content-Type':'application/json'}
          })
        const result = await res.json();
        if(res.status==200){
            setUsers(result);
        }
    }
    async function deleteUser(id){
        const res = await fetch('http://localhost:3001/user/'+id,{
            method:'DELETE',
            headers:{'Authorization':'Bearer '+props.token}
        })
        if(res.status==200){
            for(var i=0;i<users.length;i++){
                if(users[i].id == id){
                    users.splice(i,1)
                }
            }
            setUsers(users);
            alert("User was successfully deleted")
        }
    }

    async function updateUser(id){
        setOpen(true);
        setEditedUser(id);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    async function saveUser(){
        const body = {
           email,
            role
        }
        const res = await fetch('http://localhost:3001/user/'+editedUser,{
            method:'PUT',
            headers:{'Authorization':'Bearer '+props.token,
        'Content-Type':'application/json'},
            body:JSON.stringify(body)
        })
        if(res.status==200){
            const data = await res.json();
            for(var i=0;i<users.length;i++){
                if(users[i].id == editedUser){
                    users[i] = data;
                }
            }
            setUsers(users)
            setOpen(false)
            alert("User was successfully updated")
        }
    }
    const handleClose = () => {
        setOpen(false);
        setEditedUser(0)
      };
    useEffect(function() {
        getUsers();
    },[])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user)=>(
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                            <TableCell align="right>">
                                <IconButton onClick={() => updateUser(user.id)}><EditIcon/></IconButton>
                                <IconButton onClick={() => deleteUser(user.id)} ><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit user</DialogTitle>
                <DialogContent>
                    <TextField label="Email" onChange={handleEmailChange}></TextField >
                    <InputLabel id="shipping_location_label">Role</InputLabel>
                    <Select labelId="shipping_location_label" id="shipping_location"  onChange={handleRoleChange}>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveUser} color="primary">
                        Update
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
        
        
    )
}