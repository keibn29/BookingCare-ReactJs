import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    arrUsers: [],
    topDoctors: [],
    allDoctors: [],
    arrdoctorInfo: [],
    arrTime: []
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

        //Top-Doctors-Homepage
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];

            return {
                ...state
            }

        //All-Doctors--doctor-manage
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];

            return {
                ...state
            }

        //fetch-doctor-info
        case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
            state.arrdoctorInfo = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_INFO_FAILED:
            state.arrdoctorInfo = [];

            return {
                ...state
            }

        //edit-doctor-info
        case actionTypes.EDIT_DOCTOR_INFO_SUCCESS:
            state.arrdoctorInfo = action.data;

            return {
                ...state
            }

        case actionTypes.EDIT_DOCTOR_INFO_FAILED:
            state.arrdoctorInfo = [];

            return {
                ...state
            }

        //fetch-allcode-time
        case actionTypes.FETCH_TIME_SUCCESS:
            state.arrTime = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_TIME_FAILED:
            state.arrTime = [];

            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;