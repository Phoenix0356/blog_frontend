import { defineStore } from 'pinia'
import UserInterface from "../models/interfaces/UserInterface.ts";
import {ref} from "vue";

export const useUserInfoStore = defineStore('userInfo', () => {
    // 使用 ref() 创建一个响应式的 user 对象
    const user = ref<UserInterface>()

    // 创建一个 action 来更新 user 对象
    function setUser(newUser: UserInterface) {
        user.value = newUser
    }
    return { user, setUser}
},{
    persist: true
})