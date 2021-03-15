import http from '../../http-common'

const profiles = {
    state: {
        account: [],
    },
    getters:{
        getAccountManager: (state) => {
            return state.account
        },
    },
    mutations:{
        setAccount(state, account) {
            state.account = account
        },
    },
    actions: {
        getAccountManagerById(context){
            http.get('/managers/6').then((response)=>{
                let account = response.data
                context.commit('setAccount', account)
            })
        },
        updateAccount(context, account){
            http.put('/managers/' +account.id,{
                fullname: account.fullname,
                description: account.description,
                gender: account.gender,
                birthday: account.birthday,
                email: account.email,
                phone: account.phone,
                address: account.address,
                id: account.id,
                roleId: account.roleId,
                status: account.status,
                avatarImageLink: account.avatarImageLink,
            })
            .then((response) => {
                context.commit('setAccount', account)
            })
        },
    }
}
export default profiles