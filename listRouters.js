const axios = require('axios')

 const routerApi = axios.create({
     baseURL: `https://witcom-core.mundiale.com.br`,
     headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': '8c271044-96af-48ce-80fa-59bf9ef79f45'
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