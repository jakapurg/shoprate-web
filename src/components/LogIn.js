import { Button, TextField, Card, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import { useState } from "react";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    

    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default function Login(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('');

    async function Login(e){
        e.preventDefault();
        console.log("x")
        const data = {email:email, password: password};
        const res = await fetch('http://localhost:3001/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const result = await res.json();
        console.log(result)
        if(res.status==401){
            setOpen(true);
        }
        else{
            //console.log(res.body)
            localStorage.setItem('token',result.access_token);
        }

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleCloseSnackbar = (event, reason) => {
        if(reason == 'clickaway'){
            return ;
        }
        setOpen(false);
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center"  justify="center">
            <Grid item xs={3}>
            <Card variant="outlined"  className={classes.root}>
             <form className="form-group" onSubmit={Login}>
            <TextField id="email" label="Email" onChange={handleEmailChange}/><br></br>
            <TextField id="password" type="password" label="Password" onChange={handlePasswordChange}/><br/>
            <div className="marginButton">
            <Button variant="contained" color="primary" onClick={Login}>Log in</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Invalid credentials
                </Alert>
            </Snackbar>
            </div>
        </form>
        </Card>
            </Grid>
            
        </Grid>
       
       
    )
}