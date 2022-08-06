import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,
    GetTopDoctorsHomepageService, getAllDoctorsService,
    createDoctorInfoService, getDoctorInfoService,
    getMarkdownService, editDoctorInfoService,
    bulkCreateSchedule, getScheduleByDate,
    getDoctorInfoExtra, getAllSpecialty,
    getAllClinic, getAllHandbook
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
//start-doing-end

//quy trình chuẩn
//fetch-allcode-gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.allcode));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetch Gender Error: ', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//fetch-allcode-position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositonSuccess(res.allcode));
            } else {
                dispatch(fetchPositonFailed());
            }
        } catch (e) {
            dispatch(fetchPositonFailed());
            console.log('fetch Position Error: ', e)
        }
    }
}

export const fetchPositonSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositonFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//fetch-allcode-role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.allcode));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetch Role Error: ', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//create-crud
export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                toast.success('Create new user succeed!');
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFailed());
                toast.error('Create new user failed!');
            }
        } catch (e) {
            dispatch(createUserFailed());
            toast.error('Create new user failed!');
            console.log('Create User Error: ', e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//read-crud
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
                toast.error('fetch All Users failed!');
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            toast.error('fetch All Users failed!');
            console.log('fetch All Users Error: ', e)
        }
    }
}

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: users
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//delete-crud
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteteUserSuccess());
                toast.success('Delete user succeed!');
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
                toast.error('Delete user failed!');
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            toast.error('Delete user failed!');
            console.log('Delete User Error: ', e)
        }
    }
}

export const deleteteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

//update-crud
export const editUserStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(inputData);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success('Update user succeed!');
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFailed());
                toast.error('Update user failed!');
            }
        } catch (e) {
            dispatch(editUserFailed());
            toast.error('Update user failed!');
            console.log('Update User Error: ', e)
        }
    }
}

export const editUserSuccess = (inputData) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: inputData
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

//
export const fetchTopDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetTopDoctorsHomepageService(10);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.users));
            } else {
                dispatch(fetchTopDoctorsFailed());
                toast.error('fetch Top Doctors failed!');
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailed());
            toast.error('fetch Top Doctors failed!');
            console.log('fetch Top Doctors Error: ', e)
        }
    }
}

export const fetchTopDoctorsSuccess = (users) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: users
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})

//fetch-all-doctor
export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.doctors));
            } else {
                dispatch(fetchAllDoctorsFailed());
                toast.error('fetch All Doctors failed!');
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
            toast.error('fetch All Doctors failed!');
            console.log('fetch All Doctors Error: ', e)
        }
    }
}

export const fetchAllDoctorsSuccess = (doctors) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: doctors
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})

//create-doctor-info
export const createDoctorInfoStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDoctorInfoService(inputData);
            if (res && res.errCode === 0) {
                dispatch(createDoctorInfoSuccess());
                toast.success('Save details doctor succeed!');
            } else {
                dispatch(createDoctorInfoFailed());
                toast.error('Save details doctor failed!');
            }
        } catch (e) {
            dispatch(createDoctorInfoFailed());
            toast.error('Save details doctor failed!');
            console.log('Save details doctor Error: ', e)
        }
    }
}

export const createDoctorInfoSuccess = () => ({
    type: actionTypes.CREATE_DOCTOR_INFO_SUCCESS
})

export const createDoctorInfoFailed = () => ({
    type: actionTypes.CREATE_DOCTOR_INFO_FAILED
})

//fetch-doctor-info
export const fetchDoctorInfoStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorInfoService(doctorId);
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorInfoSuccess(res.doctorInfo));
            } else {
                dispatch(fetchDoctorInfoFailed());
                toast.error('fetch Doctor Info failed!');
            }
        } catch (e) {
            dispatch(fetchDoctorInfoFailed());
            toast.error('fetch Doctor Info failed!');
            console.log('fetch Doctor Info Error: ', e)
        }
    }
}

export const fetchDoctorInfoSuccess = (doctorInfo) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    data: doctorInfo
})

export const fetchDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAILED
})

//edit-doctor-info
export const editDoctorInfoStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editDoctorInfoService(inputData);
            if (res && res.errCode === 0) {
                dispatch(editDoctorInfoSuccess());
                toast.success('Update Doctor Info succeed!');
            } else {
                dispatch(editDoctorInfoFailed());
                toast.error('Update Doctor Info failed!');
            }
        } catch (e) {
            dispatch(editDoctorInfoFailed());
            toast.error('Update Doctor Info failed!');
            console.log('Update Doctor Info Error: ', e)
        }
    }
}

export const editDoctorInfoSuccess = () => ({
    type: actionTypes.EDIT_DOCTOR_INFO_SUCCESS
})

export const editDoctorInfoFailed = () => ({
    type: actionTypes.EDIT_DOCTOR_INFO_FAILED
})

//fetch-allcode-time
export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchTimeSuccess(res.allcode));
            } else {
                dispatch(fetchTimeFailed());
                toast.error('fetch Time failed!');
            }
        } catch (e) {
            dispatch(fetchTimeFailed());
            toast.error('fetch Time failed!');
            console.log('fetch Time Error: ', e)
        }
    }
}

export const fetchTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: timeData
})

export const fetchTimeFailed = () => ({
    type: actionTypes.FETCH_TIME_FAILED
})

//bulk-create-schedule
export const bulkCreateScheduleStart = (scheduleInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await bulkCreateSchedule(scheduleInput);
            if (res && res.errCode === 0) {
                dispatch(bulkCreateScheduleSuccess());
                toast.success('Save Schedule succeed!');
            } else {
                dispatch(bulkCreateScheduleFailed());
                toast.error('Save Schedule failed!');
            }
        } catch (e) {
            dispatch(bulkCreateScheduleFailed());
            toast.error('Save Schedule failed!');
            console.log('Save Schedule Error: ', e)
        }
    }
}

export const bulkCreateScheduleSuccess = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_SUCCESS
})

export const bulkCreateScheduleFailed = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_FAILED
})

//fetch-allcode-time
export const fetchDoctorScheduleStart = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorScheduleSuccess(res.schedule));
            } else {
                dispatch(fetchDoctorScheduleFailed());
                toast.error('fetch Doctor Schedule failed!');
            }
        } catch (e) {
            dispatch(fetchDoctorScheduleFailed());
            toast.error('fetch Doctor Schedule failed!');
            console.log('fetch Doctor Schedule Error: ', e)
        }
    }
}

export const fetchDoctorScheduleSuccess = (scheduleData) => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS,
    data: scheduleData
})

export const fetchDoctorScheduleFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED
})

//fetch-allcode-price
export const fetchPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PRICE');
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.allcode));
            } else {
                dispatch(fetchPriceFailed());
            }
        } catch (e) {
            dispatch(fetchPriceFailed());
            console.log('fetch Price Error: ', e)
        }
    }
}

export const fetchPriceSuccess = (priceData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: priceData
})

export const fetchPriceFailed = () => ({
    type: actionTypes.FETCH_PRICE_FAILED
})

//fetch-allcode-province
export const fetchProvinceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceSuccess(res.allcode));
            } else {
                dispatch(fetchProvinceFailed());
            }
        } catch (e) {
            dispatch(fetchProvinceFailed());
            console.log('fetch Province Error: ', e)
        }
    }
}

export const fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData
})

export const fetchProvinceFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
})

//fetch-allcode-payment
export const fetchPaymentStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PAYMENT');
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentSuccess(res.allcode));
            } else {
                dispatch(fetchPaymentFailed());
            }
        } catch (e) {
            dispatch(fetchPaymentFailed());
            console.log('fetch Payment Error: ', e)
        }
    }
}

export const fetchPaymentSuccess = (paymentData) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: paymentData
})

export const fetchPaymentFailed = () => ({
    type: actionTypes.FETCH_PAYMENT_FAILED
})

//fetch-doctor-info-extra
export const fetchDoctorInfoExtraStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorInfoExtra(doctorId);
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorInfoExtraSuccess(res.infoExtra));
            } else {
                dispatch(fetchDoctorInfoExtraFailed());
                toast.error('fetch Doctor Info failed!');
            }
        } catch (e) {
            dispatch(fetchDoctorInfoExtraFailed());
            toast.error('fetch Doctor Info failed!');
            console.log('fetch Doctor Info Error: ', e)
        }
    }
}

export const fetchDoctorInfoExtraSuccess = (infoExtra) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_EXTRA_SUCCESS,
    data: infoExtra
})

export const fetchDoctorInfoExtraFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_EXTRA_FAILED
})

//fetch-all-specialty
export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.allSpecialty));
            } else {
                dispatch(fetchAllSpecialtyFailed());
                toast.error('fetch All Specialty failed!');
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFailed());
            toast.error('fetch All Specialty failed!');
            console.log('fetch All Specialty Error: ', e)
        }
    }
}

export const fetchAllSpecialtySuccess = (allSpecialty) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: allSpecialty
})

export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
})

//fetch-all-clinic
export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.allClinic));
            } else {
                dispatch(fetchAllClinicFailed());
                toast.error('fetch All Clinic failed!');
            }
        } catch (e) {
            dispatch(fetchAllClinicFailed());
            toast.error('fetch All Clinic failed!');
            console.log('fetch All Clinic Error: ', e)
        }
    }
}

export const fetchAllClinicSuccess = (allClinic) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: allClinic
})

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
})

//fetch-all-handbook
export const fetchAllHandbookStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllHandbook(limit);
            if (res && res.errCode === 0) {
                dispatch(fetchAllHandbookSuccess(res.hanbooks));
            } else {
                dispatch(fetchAllHandbookFailed());
                toast.error('fetch Handbooks failed!');
            }
        } catch (e) {
            dispatch(fetchAllHandbookFailed());
            toast.error('fetch Handbooks failed!');
            console.log('fetch Handbooks Error: ', e)
        }
    }
}

export const fetchAllHandbookSuccess = (hanbooks) => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
    data: hanbooks
})

export const fetchAllHandbookFailed = () => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_FAILED
})