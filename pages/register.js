import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'
import TextField  from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(2)
        
    }
}));

const mapDispatchToProps = () => {
    const dispatch = useDispatch()
    const addRestuarent = (data) => {
        dispatch({
            type:'ADD_RESTAURENT',
            playload: data
        })
    }
    return { addRestuarent }
}


const Register = () => {

    const classes = useStyles();
    const { addRestuarent } = mapDispatchToProps();

    const [restaurent, setRestaurent] = useState({
        restaurentName: '',
        email: '',
        priceRange: '',
        since: '',
        address: ''
    });

    const handleInputChange = (event) => {
        setRestaurent({
            ...restaurent,
            [event.target.name]: event.target.value
        })
        console.log(restaurent);
    }

    const onSubmitRegister = (event) => {
        event.preventDefault();
        const newRestaurent = {
            restaurentName: restaurent.restaurentName,
            email: restaurent.email,
            priceRange: restaurent.priceRange,
            since: restaurent.since,
            address: restaurent.address
        }
        addRestuarent(newRestaurent);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Restaurent Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmitRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="restaurentName"   
                                label="Restaurent Name"
                                id="restaurentName"
                                autoFocus
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                label="Email Address"
                                id="email"
                                autoComplete="email"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="priceRange"   
                                label="Price Range"
                                id="priceRange"
                                autoComplete="1000-2000"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="since"
                                label="Since"
                                id="since"
                                autoComplete="since"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="address"
                                label="Address"
                                id="address"
                                multiline
                                rows={4}
                                autoComplete="address"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >SUBMIT</Button>
                </form>
            </div>
        </Container>
    )
}


export default Register;
