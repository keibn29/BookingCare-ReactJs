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
    arrTime: [],
    arrDoctorSchedule: [],
    allPrice: [],
    allProvince: [],
    allPayment: [],
    arrDoctorInfoExtra: [],
    allSpecialty: []
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

        //fetch-all-doctors
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

        //fetch-doctor-schedule
        case actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS:
            state.arrDoctorSchedule = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED:
            state.arrDoctorSchedule = [];

            return {
                ...state
            }

        //fetch-allcode-price
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.allPrice = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_PRICE_FAILED:
            state.allPrice = [];

            return {
                ...state
            }

        //fetch-allcode-province
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.allProvince = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_PROVINCE_FAILED:
            state.allProvince = [];

            return {
                ...state
            }

        //fetch-allcode-payment
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.allPayment = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_PAYMENT_FAILED:
            state.allPayment = [];

            return {
                ...state
            }

        //fetch-doctor-info-extra
        case actionTypes.FETCH_DOCTOR_INFO_EXTRA_SUCCESS:
            state.arrDoctorInfoExtra = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_INFO_EXTRA_FAILED:
            state.arrDoctorInfoExtra = [];

            return {
                ...state
            }

        //fetch-all-specialty
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.allSpecialty = [];

            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;