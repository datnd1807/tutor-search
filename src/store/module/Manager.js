import http from '../../http-common'
const managerManagement = {
    state: {
        managers:[]
    },
    getters:{
        getManagers: (state) =>{
            return state.managers;
        }
    },
    mutations:{
        setManager(state, managers){
            return state.managers = managers;
        },
    },
    actions:{
        getAllManagers(context){
            http.get('/managers/get-by-role/2').then((response)=>{
                let managers = response.data
                context.commit('setManager', managers)
            })
        },
    }
}
export default managerManagement