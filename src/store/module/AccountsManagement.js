
import http from '../../http-common'

const accounts = {
    state: {
        accounts: [],
        accountId:'',
        account:{}
    },
    getters: {
        getAllAccounts: (state) => {
            return state.accounts
        },
        getAccount:(state) =>{
            return state.account
        }
    },
    mutations: {
        setAccounts(state, accounts) {
            state.accounts = accounts
        },
        setAccount(state, account){
            state.account = account
        }
    },
    actions: {
        getAllAccountsAction(context) {
            http.get('/accounts/all').then((response) => {
                let accounts = response.data
                context.commit('setAccounts', accounts)
            })
        },
        getAccountById(context, accountId){
            http.get(`/accounts/${accountId}`).then((response) =>{

            })
        },
        insertAccount(context, account){
            let url = '/accounts'
            http.post(url, account).then((response) =>{
                console.log("Status: " + response.status)
            })
        },
        insertManager(context, manager){
            http.post('/managers').then((response) =>{
                console.log("Status: " + response.status)
            })
        }
    }
}
export default accounts
