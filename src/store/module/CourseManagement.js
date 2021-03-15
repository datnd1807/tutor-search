import http from '../../http-common'

const courseManament = {
    state: {
        courses: [],
    },
    getters:{
        getCourses: (state) => {
            return state.courses
        },
    },
    mutations:{
        setCourses(state, courses) {
            state.courses = courses
        },
        updateCourse(state, course){
           const index = state.courses.findIndex(c => c.id == course.id)
            if(index != -1){
                state.courses.splice(index, 1, course);
            }
        }
    },
    actions: {
        getAllCourses(context){
            http.get('/courses/all').then((response)=>{
                let courses = response.data
                context.commit('setCourses', courses)
            })
        },
        disableCourseStatus(context, course){
            http.put(`/courses/${course.id}`, {
                id: course.id,
                name: course.name,
                beginTime: course.beginTime,
                endTime: course.endTime,
                studyForm: course.studyForm,
                studyFee: course.studyFee,
                daysInWeek: course.daysInWeek,
                beginDate: course.beginDate,
                endDate: course.endDate,
                classHasSubjectId: course.classHasSubjectId,
                confirmedBy: course.confirmedBy,
                confirmedDate: course.confirmedDate,
                createdBy: course.createdBy,
                createdDate: course.createdDate,
                description: course.description,
                maxTutee : course.maxTutee,
                status: "Denied",
            })
            .then((response) =>{
                context.commit('updateCourse', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        },
        enableCourseStatus(context, course){
            http.put(`/courses/${course.id}`, {
                id: course.id,
                name: course.name,
                beginTime: course.beginTime,
                endTime: course.endTime,
                studyForm: course.studyForm,
                studyFee: course.studyFee,
                daysInWeek: course.daysInWeek,
                beginDate: course.beginDate,
                endDate: course.endDate,
                classHasSubjectId: course.classHasSubjectId,
                confirmedBy: course.confirmedBy,
                confirmedDate: course.confirmedDate,
                createdBy: course.createdBy,
                createdDate: course.createdDate,
                description: course.description,
                maxTutee : course.maxTutee,
                status: "Active",
            })
            .then((response) =>{
                context.commit('updateCourse', JSON.parse(response.config.data))
            })
            .catch((error) =>{
                console.log("Error: "+error)
            });
        }
    }
}
export default courseManament