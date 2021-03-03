import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import TextField  from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0Nzk1NDI4LCJleHAiOjE2MTczODc0Mjh9.3IQGCBtGkVQp4U8Q54ksg-A9YqAfxupok1m-9I3Vc5A';

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

const Register = () => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [restaurant, setRestaurant] = useState({
        restaurantName: '',
        email: '',
        priceRange: '',
        since: '',
        address: ''
    });

    const handleInputChange = (event) => {
        setRestaurant({
            ...restaurant,
            [event.target.name]: event.target.value
        })
        console.log(restaurant);
    }

    const onSubmitRegister = (event) => {
        event.preventDefault();
        const newRestaurant = {
            restaurantName: restaurant.restaurantName,
            email: restaurant.email,
            priceRange: restaurant.priceRange,
            since: restaurant.since,
            address: restaurant.address
        }
        console.log(newRestaurant)
        axios.post('http://localhost:1337/restaurants', newRestaurant, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                dispatch({
                    type: 'ADD_RESTAURANT',
                    payload: response.data
                })
                window.location = "http://localhost:3000"
            }).catch(error => {console.log(error)})
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Restaurant Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmitRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="restaurantName"   
                                label="Restaurant Name"
                                id="restaurantName"
                                autoFocus
                                autoComplete="restaurantName"
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
                                autoComplete="priceRange"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="since"
                                label="Since"
                                id="since"
                                autoComplete="1000"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="address"
                                label="Address"
                                id="address"
                                autoComplete="address"
                                multiline
                                rows={4}
                                onChange={handleInputChange}
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
