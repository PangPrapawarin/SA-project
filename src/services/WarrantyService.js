import Axios from "axios"

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default{
    async getWarranty() {
        let url = `${api_endpoint}/api/warranty/show`;
        try{
            let res = await Axios.get(url)
            return res
        }catch (e){

        }
    },
}