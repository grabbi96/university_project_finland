import { SET_USER, SET_RESET_PASSWORD_USER } from "./types";
import { setPlace } from "./metaAction"
export const setPlaceAction = (data, history) => dispatch => {
    dispatch(setPlace(data))
    history.push("get-charge")
}