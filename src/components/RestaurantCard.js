import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { CardActions, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0Njc5MDU3LCJleHAiOjE2MTcyNzEwNTd9.hU0WiM9rkIn5PB8Fx08-J3VpjrEDsQ3jhMScDshYeZ8';
const useStyles = makeStyles((theme) => ({
    root:{
        maxWidth: 345,
        margin: theme.spacing(1)
    },
    media: {
        height: 200,
    }
}));

const RestaurantCard = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const onDelRestaurant = () => {
        axios.delete(`http://localhost:1337/restaurants/${props.data.id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch({
                type: 'DEL_RESTAURANT',
                payload: props.data.id
            })
            console.log(response.data);
        }).catch((error) => {console.log(error)});
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://picsum.photos/200/300"
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.data.restaurantName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton 
                    aria-label="delete"
                    onClick={onDelRestaurant}
                 >
                    <DeleteIcon />
                </IconButton>
            </CardActions>   
        </Card>
    )
}

export default RestaurantCard
