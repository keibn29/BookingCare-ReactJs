import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put(`api/edit-user`, inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`,)
}

const GetTopDoctorsHomepageService = (limit) => {
    return axios.get(`/api/top-doctor-homepage?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const createDoctorInfoService = (inputData) => {
    return axios.post(`/api/create-doctor-info`, inputData)
}

const getDoctorInfoService = (doctorId) => {
    return axios.get(`/api/get-doctor-info?id=${doctorId}`)
}

const getMarkdownService = (doctorId) => {
    return axios.get(`/api/get-markdown?id=${doctorId}`)
}

const editDoctorInfoService = (inputData) => {
    return axios.put(`/api/edit-doctor-info`, inputData)
}


export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    GetTopDoctorsHomepageService,
    getAllDoctorsService,
    createDoctorInfoService,
    getDoctorInfoService,
    getMarkdownService,
    editDoctorInfoService
};