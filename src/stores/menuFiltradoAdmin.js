import {atom} from "nanostores";

export const defaultAction = atom("crear")

export const updateAction = (action)=>{
  defaultAction.set(action)
}

const AdminMenus = {
  COMPOSICIONESTFT
}