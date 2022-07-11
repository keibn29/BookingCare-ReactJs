import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
//start-doing-end

//quy trình chuẩn
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

//
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

//
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

export const fetchAllUsersSuccess = (inputId) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: inputId
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