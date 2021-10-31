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
}