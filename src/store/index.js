import { createStore } from "vuex"
import * as Api from '../helper/Api.js'


export default new createStore({
    state: {
        user: {},
        roles: [],
        my_permissions: [],
        my_roles: []
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getRoles(state) {
            return state.roles
        },
        getMyPermission(state) {
            return state.my_permissions
        },
        getMyRole(state) {
            return state.my_roles
        },
        isLoggedIn() {
            // console.log(localStorage.getItem('token'))
            return localStorage.getItem('token') !== null ? true : false
        }
    },
    mutations: {
        ASSIGN_USER(state, payload) {
            state.user = payload.user
            state.my_permissions = Api.objectToArray(payload.permission, 'name')
            state.my_roles = payload.role
        },
        ASSIGN_ROLES(state, payload) {
            state.roles = payload
        },
        ASSIGN_MY_PERMISSION(state, payload) {
            state.my_permissions = Api.objectToArray(payload, 'name')
        },
    },
    actions: {
        getUser({ commit }) {
            axios.get(env.VITE_API_URL + 'user-auth').then(response => {
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    commit('ASSIGN_USER', response.data.data)
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },
        getRoles({ commit }) {
            axios.get(env.VITE_API_URL + 'role').then(response => {
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    commit('ASSIGN_ROLES', response.data.data)
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },
        getMyPermission({ commit }) {
            Api.start(this.$Progress)
            axios.get(env.VITE_API_URL + 'my-permission').then(response => {
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    commit('ASSIGN_MY_PERMISSION', response.data.data)
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        }
    }
});