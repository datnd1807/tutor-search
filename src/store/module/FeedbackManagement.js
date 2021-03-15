import http from '../../http-common'

const feedbackManagement = {
    state: {
        feedbacks: [],
        feedbackAfterConfirm: []
    },
    getters:{
        getFeedback: (state) =>{
            return state.feedbacks;
        },
        getFeedbackAfterConfirm: (state) =>{
            return state.feedbackAfterConfirm;
        },
    },
    mutations:{
        setFeedback (state, feedbacks){
            return state.feedbacks = feedbacks;
        },
        setFeedbackAfterConfirm(state, feedbacks){
            return state.feedbackAfterConfirm = feedbacks;
        },
        updateFeedback(state, feedback){
            const index = state.feedbacks.findIndex(f => f.id == feedback.id)
             if(index != -1){
                 state.feedbacks.splice(index, 1, feedback);
             }
         }
    },
    actions: {
        getFeedbacks(context){
            http.get('/feedbacks/all').then((response)=>{
                let feedbacks = response.data
                context.commit('setFeedback', feedbacks)
            })
        },
        getFeedbacksAfterConfirm(context){
            http.get('/feedbacks/all').then((response)=>{
                let feedbacks = response.data
                context.commit('setFeedbackAfterConfirm', feedbacks)
            })
        },
        acceptFeedbackTutee(context, feedback){
            http.put(`/feedbacks/${feedback.id}`, {
                id: feedback.id,
                tuteeId: feedback.tuteeId,
                tutorId: feedback.tutorId,
                comment: feedback.comment,
                rate: feedback.rate,
                description: feedback.description,
                createdDate: feedback.createdDate,
                confirmedDate: feedback.confirmedDate,
                status: "Accepted"
            })
            .then((response) =>{
                context.commit('updateFeedback', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        deniesFeedbackTutee(context, feedback){
            http.put(`/feedbacks/${feedback.id}`, {
                id: feedback.id,
                tuteeId: feedback.tuteeId,
                tutorId: feedback.tutorId,
                comment: feedback.comment,
                rate: feedback.rate,
                description: feedback.description,
                createdDate: feedback.createdDate,
                confirmedDate: feedback.confirmedDate,
                status: "Denied"
            })
            .then((response) =>{
                context.commit('updateFeedback', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        }
        
    }
}
export default feedbackManagement