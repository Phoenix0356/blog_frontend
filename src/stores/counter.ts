import { defineStore } from 'pinia'
import UserInterface from "../models/interfaces/UserInterface.ts";
import {ref} from "vue";
import CollectionInterface from "../models/interfaces/CollectionInterface.ts";

export const useUserInfoStore = defineStore('userInfo', () => {
    const user = ref<UserInterface>()

    function setUser(newUser: UserInterface) {
        user.value = newUser
    }

    function isVisitor():boolean{
        if(!user.value) return true
        return user.value.roleLevel<1
    }

    return { user, setUser, isVisitor}
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