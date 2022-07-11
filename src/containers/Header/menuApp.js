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
            {
                name: 'menu.admin.user.manage-admin', link: '/system/manage-admin'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' },
                // ]
            },
            {
                name: 'menu.admin.user.manage-doctor', link: '/system/manage-doctor'
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