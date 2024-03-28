import {atom} from "recoil"

export const isUserLoggedAtom = atom({
    key : "user",
    default : false
})

export const postAtom = atom({
    key : "post",
    default : []
})