import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Auth/Login.vue'

import HomeView from '../views/HomeView.vue'

import Dashboard from "../views/dashboard/Dashboard.vue"

import IndexCompanyIndustri from "../views/company_industri/Index.vue"
import CreateEditCompanyIndustri from "../views/company_industri/CreateEdit.vue"

import IndexDepartemen from "../views/departemen/Index.vue"
import CreateEditDepartemen from "../views/departemen/CreateEdit.vue"

import IndexUserCompany from "../views/user_company/Index.vue"
import CreateEditUserCompany from "../views/user_company/CreateEdit.vue"

import IndexWorkPattern from "../views/work_pattern/Index.vue"
import CreateEditWorkPattern from "../views/work_pattern/CreateEdit.vue"
import ViewWorkPattern from "../views/work_pattern/View.vue"

import IndexDataPersonel from "../views/data_personel/Index.vue"
import CreateEditDataPersonel from "../views/data_personel/CreateEdit.vue"
import ShowDataPersonel from "../views/data_personel/Show.vue"

import IndexPersonelTimeWork from "../views/personel_time_work/Index.vue"
import CreateEditPersonelTimeWork from "../views/personel_time_work/CreateEdit.vue"

import IndexAttendanceSpot from '../views/attendance_spot/Index.vue'
import CreateEditAttendanceSpot from '../views/attendance_spot/CreateEdit.vue'
import AddPersonelAttendanceSpot from '../views/attendance_spot/AddPersonel.vue'
import DetailPersonelAttendanceSpot from '../views/attendance_spot/DetailPersonel.vue'

import IndexDailyAttendance from '../views/daily_attendance/Index.vue'

import IndexAttendanceSummary from '../views/attendance_summary/Index.vue'

import DetailCompanyUser from '../views/user/DetailCompany.vue'
import EditCompanyUser from '../views/user/EditCompany.vue'

import DetailDeviceSettings from '../views/device_settings/DetailDeviceSettings.vue'

import IndexOvertime from '../views/overtime/Index.vue'

import IndexVisit from '../views/visit/Index.vue'

import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import UserPasswordReset from '../views/user/PasswordReset.vue'

import Role from "../views/user/Role.vue"
import Permission from "../views/user/Permission.vue"
import RolePermission from "../views/user/RolePermission.vue"

import IndexIzinHari from "../views/izin/hari/Index.vue"
import DetailIzinHari from "../views/izin/hari/Detail.vue"

import IndexIzinCuti from "../views/izin/cuti/Index.vue"
import DetailIzinCuti from "../views/izin/cuti/Detail.vue"

import IndexIzinjam from "../views/izin/jam/Index.vue"
import DetailIzinjam from "../views/izin/jam/Detail.vue"

const config = {
  meta: {
    requiresAuth: true
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // LOGGED IN AREA
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      ...config
    },

    //Dashboard
    { path: "/", component: Dashboard, ...config },
    { path: "/detail-company-user/:id", component: DetailCompanyUser, name: "detailCompanyUser", ...config },
    { path: "/edit-company-user/:id", component: EditCompanyUser, name: "editCompanyUser", ...config },


    //Company Industri
    { path: "/index-company-industri", component: IndexCompanyIndustri, ...config },
    { path: "/create-company-industri", component: CreateEditCompanyIndustri, ...config },
    { path: "/update-company-industri/:id", component: CreateEditCompanyIndustri, name: "editCompanyIndustri", ...config },

    //Departemen
    { path: "/index-departemen", component: IndexDepartemen, ...config },
    { path: "/create-departemen", component: CreateEditDepartemen, ...config },
    { path: "/update-departemen/:id", component: CreateEditDepartemen, name: "editDepartemen", ...config },

    //Company
    { path: "/index-user-company", component: IndexUserCompany, ...config },
    { path: "/create-user-company", component: CreateEditUserCompany, ...config },
    { path: "/update-user-company/:id", component: CreateEditUserCompany, name: "editUserCompany", ...config },

    { path: "/detail-device-settings", component: DetailDeviceSettings, name: "detailDeviceSettings", ...config },

    //Work Pattern
    { path: "/index-work-pattern", component: IndexWorkPattern, ...config },
    { path: "/create-work-pattern", component: CreateEditWorkPattern, ...config },
    { path: "/update-work-pattern/:id", component: CreateEditWorkPattern, name: "editWorkPattern", ...config },
    { path: "/detail-work-pattern/:id", component: ViewWorkPattern, name: "detailWorkPattern", ...config },

    //Data Personel
    { path: "/index-data-personel", component: IndexDataPersonel, ...config },
    { path: "/create-data-personel", component: CreateEditDataPersonel, ...config },
    { path: "/edit-data-personel/:id", component: CreateEditDataPersonel, name: "editDataPersonel", ...config },
    { path: "/show-data-personel/:id", component: ShowDataPersonel, name: "showDataPersonel", ...config },

    //Jadwal Karyawan
    { path: "/index-personel-time-work", component: IndexPersonelTimeWork, ...config },
    { path: "/create-personel-time-work", component: CreateEditPersonelTimeWork, ...config },
    { path: "/update-personel-time-work/:id", component: CreateEditPersonelTimeWork, name: "editPersonelTimeWork", ...config },

    // Attendance Spot
    { path: '/attendance-spot', component: IndexAttendanceSpot, ...config },
    { path: '/attendance-spot/create', component: CreateEditAttendanceSpot, ...config },
    { path: '/attendance-spot/edit/:id', component: CreateEditAttendanceSpot, name: 'editAttendanceSpot', ...config },
    { path: '/attendance-spot/add-personel/:id', component: AddPersonelAttendanceSpot, name: 'addPersonelAttendanceSpot', ...config },
    { path: '/attendance-spot/detail-personel/:id', component: DetailPersonelAttendanceSpot, name: 'detailPersonelAttendanceSpot', ...config },

    // Daily Attendance
    { path: '/daily-attendance', component: IndexDailyAttendance, ...config },
    { path: '/attendance-summary', component: IndexAttendanceSummary, ...config },

    // Overtime
    { path: '/overtime', component: IndexOvertime, ...config },

    // Visit
    { path: '/visit', component: IndexVisit, ...config },

    // route user
    { path: "/user", component: User, ...config },
    { path: "/user-edit/:id", component: UserEdit, name: "editUser", ...config },
    { path: "/user-password-reset", component: UserPasswordReset, name: "passwordResetUser", ...config },

    // route role
    { path: "/role", component: Role, ...config },
    { path: "/permission", component: Permission, ...config },
    { path: "/role-permission/:id", component: RolePermission, name: "rolePermission", ...config },

    { path: "/izin-hari", component: IndexIzinHari, ...config },
    { path: "/izin-hari/detail/:id", component: DetailIzinHari, name: "detailIzin", ...config },

    { path: "/izin-cuti", component: IndexIzinCuti, ...config },
    { path: "/izin-cuti/detail/:id", component: DetailIzinCuti, name: "detailIzinCuti", ...config },

    { path: "/izin-jam", component: IndexIzinjam, ...config },
    { path: "/izin-jam/detail/:id", component: DetailIzinjam, name: "detailIzinjam", ...config },
  ]
})

export default router
