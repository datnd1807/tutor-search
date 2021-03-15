import Vuex from 'vuex'
import Vue from 'vue'
import ProfileManager from './module/ProfileManager'
import CourseManagement from './module/CourseManagement'
import TutorManagement from './module/TutorManagement'
import FeedbackManagement from './module/FeedbackManagement'
import Membership from './module/Membership'
import Manager from './module/Manager'
import AccountsManagement from './module/AccountsManagement'
import RolesManagement from './module/RolesManagement'
import ClassesManagement from './module/ClassesManagement'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        ProfileManager,
        CourseManagement,
        TutorManagement,
        FeedbackManagement,
        Membership,
        Manager,
        AccountsManagement,
        ClassesManagement, 
        RolesManagement
    }
})