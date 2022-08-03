export const adminMenu = [
    { //người dùng
        name: 'menu.admin.user.user',
        menus: [
            {
                name: 'menu.admin.user.crud-react', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.user.crud-redux', link: '/system/user-manage-redux'
            },
            // {
            //     name: 'menu.admin.user.manage-admin', link: '/system/manage-admin'
            // },
            {
                name: 'menu.admin.user.manage-doctor', link: '/system/manage-doctor'
            },
            { //quản lí kế hoạch khám bệnh - doctor
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    { //phòng khám
        name: 'menu.admin.clinic.clinic',
        menus: [
            {
                name: 'menu.admin.clinic.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //chuyên khoa
        name: 'menu.admin.specialty.specialty',
        menus: [
            {
                name: 'menu.admin.specialty.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //cẩm nang
        name: 'menu.admin.handbook.handbook',
        menus: [
            {
                name: 'menu.admin.handbook.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.user.user',
        menus: [
            { //quản lí kế hoạch khám bệnh - doctor
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { //quản lí bệnh nhân đặt lịch - doctor
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },
        ]
    }
];