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
    async updateAppraisal(id, price, detail){
        try{
            let url = `${api_endpoint}/api/appraisal/update-detail/${id}`;
            let body = {
                id: id,
                price: price,
                detail: detail
            }
            let res = await Axios.post(url, body);
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