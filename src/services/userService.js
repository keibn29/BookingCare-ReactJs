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

const bulkCreateSchedule = (scheduleInput) => {
    return axios.post(`/api/bulk-create-schedule`, scheduleInput)
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getDoctorInfoExtra = (doctorId) => {
    return axios.get(`/api/get-doctor-info-extra?doctorId=${doctorId}`)
}

const getDoctorInfoGeneral = (doctorId) => {
    return axios.get(`/api/get-doctor-info-general?doctorId=${doctorId}`)
}

const createBookAppointment = (dataBooking) => {
    return axios.post(`/api/patient-book-appointment`, dataBooking)
}

const verifyBookAppointment = (doctorId, token) => {
    return axios.put(`/api/verify-book-appointment?doctorId=${doctorId}&token=${token}`)
}

const createSpecialty = (specialtyData) => {
    return axios.post(`/api/create-new-specialty`, specialtyData)
}

const getTopSpecialty = (limit) => {
    return axios.get(`/api/top-specialty-homepage?limit=${limit}`)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

const editSpecialty = (specialtyData) => {
    return axios.put(`/api/edit-special`, specialtyData)
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
    editDoctorInfoService,
    bulkCreateSchedule,
    getScheduleByDate,
    getDoctorInfoExtra,
    getDoctorInfoGeneral,
    createBookAppointment,
    verifyBookAppointment,
    createSpecialty,
    getTopSpecialty,
    getAllSpecialty,
    editSpecialty
};