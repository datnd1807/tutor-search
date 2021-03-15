import http from '../../http-common'
const tutorManament = {
    state: {
        tutors: [],
    },
    getters:{
        getTutors: (state) =>{
            return state.tutors
        },
    },
    mutations:{
        setTutors(state, tutors) {
            state.tutors = tutors
        },
        updateTutors(state, tutor){
           const index = state.tutors.findIndex(t => t.id == tutor.id)
            if(index != -1){
                state.tutors.splice(index, 1, tutor);
            }
        }
    },
    actions:{
        getAllTutors(context){
            http.get('/tutors/all').then((response)=>{
                let tutors = response.data
                context.commit('setTutors', tutors)
            })
        },
        disableTutorStatus(context, tutor){
            http.put(`/tutors/${tutor.id}`, {
                id: tutor.id,
                educationLevel: tutor.educationLevel,
                school: tutor.school,
                points: tutor.points,
                membershipId: tutor.membershipId,
                socialIdUrl: tutor.socialIdUrl,
                certificationUrl: tutor.certificationUrl,
                fullname: tutor.fullname,
                gender: tutor.gender,
                birthday: tutor.birthday,
                email: tutor.email,
                phone: tutor.phone,
                avatarImageLink: tutor.avatarImageLink,
                address: tutor.address,
                roleId: tutor.roleId,
                description: tutor.description,
                status: 'Disable'
            })
            .then((response) =>{
                context.commit('updateTutors', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        enableTutorStatus(context, tutor){
            http.put(`/tutors/${tutor.id}`, {
                id: tutor.id,
                educationLevel: tutor.educationLevel,
                school: tutor.school,
                points: tutor.points,
                membershipId: tutor.membershipId,
                socialIdUrl: tutor.socialIdUrl,
                certificationUrl: tutor.certificationUrl,
                fullname: tutor.fullname,
                gender: tutor.gender,
                birthday: tutor.birthday,
                email: tutor.email,
                phone: tutor.phone,
                avatarImageLink: tutor.avatarImageLink,
                address: tutor.address,
                roleId: tutor.roleId,
                description: tutor.description,
                status: 'Active'
            })
            .then((response) =>{
                context.commit('updateTutors', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        }
    }
}
export default tutorManament