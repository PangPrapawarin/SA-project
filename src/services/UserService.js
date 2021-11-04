import Axios from "axios"

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default{
    async getUser() {
        let url = `${api_endpoint}/api/user/all-users`;
        try{
            let res = await Axios.get(url)
            return res
        }catch (e){

        }
    },
    async createUser(newUser){
        try{
            console.log(newUser.name+' service');
            let url = `${api_endpoint}/api/user/create-employee`;
            let res = await Axios.post(url, newUser)
            
            return res
        }catch (e){
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    }
}