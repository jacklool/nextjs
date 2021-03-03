import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import RestaurantCard from '../src/components/RestaurantCard'
import Container from '@material-ui/core/Container'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0Njc5MDU3LCJleHAiOjE2MTcyNzEwNTd9.hU0WiM9rkIn5PB8Fx08-J3VpjrEDsQ3jhMScDshYeZ8';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection:'row',
    }
}));

const Index = () => {
    const classes = useStyles();
    const restaurants = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:1337/restaurants',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch({
                type: 'GET_RESTAURANTS',
                payload: response.data
            })
            console.log(response.data);
        }).catch((error) => {console.log(error)});
    },[]);
    
    return (
        <Container component="main" className={classes.root} >
            {
                restaurants.map(item => (
                    <div key={item.id}><RestaurantCard data={item}/></div>
                    
                ))
            }
        </Container>
    )
}

export default Index;
