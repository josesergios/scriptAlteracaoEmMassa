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

class listVariablesResource {
   static async variablesResource(id) {
      try {
          let listVariables = await routerApi.get(`/router/${id}`)
          let data = listVariables.data.data
          let variablesResource = data.settings.variables
          //console.log(variablesResource)
          return variablesResource
       } catch (error) {
          console.log(error)
       }
   }
}

module.exports = listVariablesResource
