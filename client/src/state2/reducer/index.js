import { combineReducers } from "redux";
import valueChanger from './valueChanger';

const Reducers = combineReducers({
    //This is like making the states
    value: valueChanger,
    //amount is a state & amountReducer is used to change this state(like setState) 
})
export default Reducers