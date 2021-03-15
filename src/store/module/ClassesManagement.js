
import { Promise, resolve } from 'core-js'
import http from '../../http-common'
import moment from "moment";

const classes = {
    state: {
        classes: [],
        classData: {
            id: 0,
            name: "",
            description: "",
            status: "Active",
            updatedDate: "",
            updatedBy: 0,
            createdDate:"",
            createdBy:0,
        },
        classId: "",
    },
    getters: {
        getAllClasses: (state) => {
            let data = state.classes
            data.forEach(element =>{
                data.createdDate = moment(element.createdDate).format("YYYY-MM-DD HH:mm:ss"),
                data.updatedDate = moment(element.updatedDate).format("YYYY-MM-DD HH:mm:ss")
            })
            
            return data
        },
        getClass: (state) => {
            let data = state.classData
            data.updatedDate = moment(data.updatedDate).format("YYYY-MM-DD HH:mm:ss")
            data.createdDate = moment(data.updatedDate).format("YYYY-MM-DD HH:mm:ss")
            return data
        },
        getClassId: (state) => {
            return state.classId
        }
    },
    mutations: {
        setClasses(state, classes) {
            state.classes = classes
        },
        setClass(state, data) {
            state.classData = data
        },
        setClassId(state, classId) {
            state.classId = classId
        }
    },
    actions: {
        getAllClassesAction(context) {
            return new Promise(resolve => {
                http.get('/classes/all').then((response) => {
                    let classes = response.data
                    context.commit('setClasses', classes)
                    resolve(response.status)
                }).catch((error) => { })
            })
        },
        getClassById(context) {
            let url = `/classes/${context.state.classId}`
            return new Promise(resolve => {
                http.get(url).then(response => {
                    let data = response.data
                    context.commit('setClass', data)
                }).catch()
            })
        },
        insertClass(context) {
            let url = '/classes'
            let date = new Date().toISOString()
            let data = {
                name: context.state.classData.name,
                description: context.state.classData.description,
                status: context.state.classData.status,
                updatedDate: date
            }
            return new Promise(resolve => {
                http.post(url, data).then((response) => {
                    resolve(response.status)
                }).catch((error) => {

                })
            })
        },
        updateClass(context) {
            let url = `/classes/${context.state.classId}`
            let date = new Date().toISOString()

            let data = {
                id: context.state.classId,
                name: context.state.classData.name,
                description: context.state.classData.description,
                status: context.state.classStatus,
                updatedDate: date,
                updatedBy: 0,
            }
            return new Promise(resolve => {
                http.put(url, data).then(response => {
                    resolve(response)
                }).catch()
            })
        },
        inactiveClass(context) {
            let url = `/classes/inactive/${context.state.classId}`
            let date = new Date().toISOString()
            let data = {
                updateDate: date,
                updateBy: 6
            }
            return new Promise(resolve => {
                http.put(url, data).then(response => {
                    resolve(response)
                }).catch()
            })
        }
    }
}
export default classes
