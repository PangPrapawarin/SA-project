import Axios from "axios"

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default{
    async getBill() {
        let url = `${api_endpoint}/api/bill/show`;
        try{
            let res = await Axios.get(url)
            return res
        }catch (e){

        }
    },
    async createBill(bill){
        try{
            let url = `${api_endpoint}/api/bill/create`;
            let res = await Axios.post(url, bill)
            
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
    },
    async updateBill(id){
        try{
            let url = `${api_endpoint}/api/bill/status-bill/${id}`;
            let body={
                bill_status:"ชำระเงินแล้ว"
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