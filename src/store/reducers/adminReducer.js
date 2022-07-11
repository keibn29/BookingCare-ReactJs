import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    arrUsers: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;

            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = true;
            state.genders = [];

            return {
                ...state
            }

        //
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];

            return {
                ...state
            }

        //
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];

            return {
                ...state
            }

        //
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.arrUsers = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.arrUsers = [];

            return {
                ...state
            }

        //
        case actionTypes.EDIT_USER_SUCCESS:
            state.arrUsers = action.data;

            return {
                ...state
            }

        case actionTypes.EDIT_USER_FAILED:
            state.arrUsers = [];

            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;