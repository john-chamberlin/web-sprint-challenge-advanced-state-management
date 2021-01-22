import axios from 'axios';

export const FETCH_SMURFS_START = 'FETCH_SMURFS_START'
export const FETCH_SMURFS_FAILED = 'FETCH_SMURFS_FAILED'
export const FETCH_SMURFS_SUCCESS = 'FETCH_SMURFS_SUCCESS'
export const ADD_SMURF = 'ADD_SMURF'
export const SET_ERROR_TEXT = 'SET_ERROR_TEXT'

export const getSmurfs = () => {
    return (dispatch => {
        dispatch({type: FETCH_SMURFS_START})
        axios.get('http://localhost:3333/smurfs')
            .then((res)=> {
                console.log(res)
                dispatch({type: FETCH_SMURFS_SUCCESS, payload: res.data})
            })
            .catch(()=> {
                dispatch({type: FETCH_SMURFS_FAILED, payload: 'Could not fetch data!'})
            })
    })
}

export const addSmurf = (smurf) => {
    return (dispatch => {
        if(smurf.name.length < 2 || smurf.nickname.length < 2 || smurf.position.length < 2) {
            dispatch(setErrorText('Invalid Smurf! Must include Name, Nickname, and Position'))
        } else {
            axios.post('http://localhost:3333/smurfs', smurf)
                .then((res)=> {
                    dispatch({type: ADD_SMURF, payload: smurf})
                })
                .catch((err)=> {
                    console.log(err)
                    dispatch(setErrorText('Network error. Unable to add smurf.'))
                })
        }
    })
}

export const setErrorText = (errorText) => {
    return ({type: SET_ERROR_TEXT, payload: errorText})
}


//Task List:
//1. Add fetch smurfs action: 
//              - fetch and return initial list of smurfs
//              - dispatch actions that indicate if we are waiting for a server response
//              - dispatch an error text action if an error is returned from the server
//2. Add add smurf action:
//              - dispatch an error text action if smurf data does not includes a name, nickname and position field
//              - send a post request with the smurf as body to see if there is an error
//              - dispatch add smurf action if request is successful
//              - dispatch an error text action if an request returns an error
//3. Add set error text action:
//              - return action object setting error text
//4. Any other actions you deem nessiary to complete application.