import Axios from "axios"

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default{
    async getAppraisal() {
        let url = `${api_endpoint}/api/appraisal/show`;
        try{
            let res = await Axios.get(url)
            return res
        }catch (e){

        }
    },
}