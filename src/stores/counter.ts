import { defineStore } from 'pinia'
import {ref} from "vue";
import CollectionInterface from "../models/interfaces/CollectionInterface.ts";
import UserInterface from "../models/interfaces/UserInterface.ts";

export const useUserInfoStore = defineStore('userInfo', () => {
    const user = ref<UserInterface>()
    const loginState = ref();

    // function setUser(newUser: UserInterface) {
    //     user.value = newUser
    // }
    //
    // function isVisitor():boolean{
    //     if(!user.value) return true
    //     return user.value.roleLevel<1
    // }
    function login():void{
        loginState.value = true
    }
    function logout():void{
        loginState.value = false
    }
    function isLogin():boolean{
        return loginState.value
    }
    return {user,loginState,login,logout,isLogin}
},{
    persist: true
})

export const useCollectionMapStore = defineStore('collectionInfo',()=>{
    const collectionMap = ref<{ [collectionId: string]: CollectionInterface }>({})
    const setCollectionMap = (collectionList:CollectionInterface[])=>{
        for (let collection of collectionList){
            collectionMap.value[collection.collectionId] = collection
        }
    }
    const deleteItemInMap = (collectionId:string) => {
        delete collectionMap.value[collectionId]
    }
    return {collectionMap,setCollectionMap,deleteItemInMap}
})

export const useCommonStore = defineStore('commonTemp',()=>{
    const articleSortStrategy = ref(0)
    const setSortStrategy = (sortStrategy:number) => {
        articleSortStrategy.value = sortStrategy
    }
    return {articleSortStrategy,setSortStrategy}
})