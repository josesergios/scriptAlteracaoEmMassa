const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config();


 const routerApi = axios.create({
     baseURL: `https://witcom-core.mundiale.com.br`,
     headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY
    }
 })
class listRouters {
  static async listRouter(){
    try {
         let listRouters = await routerApi.get(`/router/by-project/625d70faf651b5bd4bd78459`)
         let routers = listRouters.data.data
         return routers
         //console.log({routers})
     }catch (error) {
          console.log(error)
        }
    }
}

module.exports = listRouters