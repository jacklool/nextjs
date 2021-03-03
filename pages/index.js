import React, { useEffect } from 'react'
import { useSelector, shallowEqual , useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import RestaurentCard from '../src/components/RestaurentCard'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root:{
    marginTop: theme.spacing(3),
  }
}));

const mapStateToProps = () => {
  console.log("mapStateToProps");
}

const mapDispatchToProps = () => {
  const dispatch = useDispatch();
  const getRestaurentLits = () => {
    dispatch({
      type: 'GET_RESTAURENT_LIST'
    })
  }
  return { getRestaurentLits }
}

const Index = () => {

  const classes = useStyles();
  const { getRestaurentLits } = mapDispatchToProps();

  useEffect(() => {
    getRestaurentLits();
  });

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <RestaurentCard />
    </Container>
  )
}

export default Index;
