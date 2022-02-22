 
import { notify } from "@kyvg/vue3-notification";
const Notifications = function (text,type){
      notify({
            text : text,
            type : type,
            duration : 3000,
            speed : 1000
      })
}

export default Notifications; 