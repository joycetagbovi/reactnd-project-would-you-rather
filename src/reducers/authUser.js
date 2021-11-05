import { AUTH_USER} from "../actions/authUser";


export default function authUser(state = null, action) {

    switch (action.type) {
        case AUTH_USER:
          return action.id
        default: 
          return state
      }
    

}
