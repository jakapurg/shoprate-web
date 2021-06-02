import { TextField, Grid, Card, Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
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

export default function Register(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function Register(e){
        e.preventDefault();
        const data = {email:email, password:password};
        const res = await fetch('http://localhost:3001/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item xs={3}>
                <Card variant="outlined" className={classes.root}>
                    <form className="form-group" onSubmit={Register}>
                        <TextField id="email" label="Email" onChange={handleEmailChange}/> <br/>
                        <TextField id="password" label="Password" onChange={handlePasswordChange}/> <br/>
                        <div className="marginButton">
                            <Button variant="contained" color="primary" onClick={Register}>Register</Button>
                        </div>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}