import http from '../../http-common'
const membership = {
    state: {
        membership: [],
        fee: []
    },
    getters:{
        getMembership: (state) =>{
            return state.membership;
        },
        getFee: (state) =>{
            return state.fee;
        },
    },
    mutations:{
        setMembership (state, membership){
            return state.membership = membership;
        },
        updateMembership(state, membership){
            const index = state.membership.findIndex(m => m.id == membership.id)
             if(index != -1){
                 state.membership.splice(index, 1, membership);
             }
         },
         insertMembership(state, membership){
             state.membership.splice(state.membership.length - 1, 0, membership);
         },
         setFee (state, fee){
            return state.fee = fee;
        },
        updateFee(state, fee){
            const index = state.fee.findIndex(f => f.id == fee.id)
             if(index != -1){
                 state.fee.splice(index, 1, fee);
             }
         },
         insertFee(state, fee){
            state.fee.splice(state.fee.length - 1, 0, membership);
        },
    },
    actions: {
        getAllMembership(context){
            http.get('/memberships/status/Active').then((response)=>{
                let membership = response.data
                context.commit('setMembership', membership)
            })
        },
        saveMembership(context, membership){
            http.put(`/memberships/${membership.id}`, {
                description: membership.description,
                status: membership.status,
                id: membership.id,
                name: membership.name,
                pointRate: membership.pointRate,
                pointAmount: membership.pointAmount,
                updatedDate: membership.updatedDate,
                updatedBy: membership.updatedBy
            })
            .then((response) =>{
                if(response.status == 204){
                    context.commit('updateMembership', JSON.parse(response.config.data))
                    context.dispatch('getAllMembership');
                }
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        createMembership(context, membership){
            http.post(`/memberships/`, {
                description: membership.description,
                status: membership.status,
                name: membership.name,
                pointRate: membership.pointRate,
                pointAmount: membership.pointAmount,
                updatedDate: membership.updatedDate,
                updatedBy: membership.updatedBy
            })
            .then((response) =>{
                    context.commit('insertMembership', JSON.parse(response.config.data))

            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        getAllFee(context){
            http.get('/fees/all').then((response)=>{
                let fee = response.data
                context.commit('setFee', fee)
            })
        },
        saveFee(context, fee){
            http.put(`/fees/${fee.id}`, {
                description: fee.description,
                status: fee.status,
                id: fee.id,
                name: fee.name,
                price: fee.price,
                updatedDate: fee.updatedDate,
                updateBy: fee.updateBy
            })
            .then((response) =>{
                if(response.status == 204){
                    context.commit('updateFee', JSON.parse(response.config.data))
                    context.dispatch('getAllFee');
                }
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        createFee(context, fee){
            http.post(`/fees/`, {
                description: fee.description,
                status: fee.status,
                name: fee.name,
                price: fee.price,
                updatedDate: fee.updatedDate,
                updateBy: fee.updateBy
            })
            .then((response) =>{
                    context.commit('insertFee', JSON.parse(response.config.data))

            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
    }
}
export default membership