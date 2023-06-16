const axios = require('axios')
const routerApi = axios.create({
   baseURL: `https://witcom-core.mundiale.com.br`,
   headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': '8c271044-96af-48ce-80fa-59bf9ef79f45'
  }
})

class listVariablesResource {
   static async variablesResource() {
      try {
          let listVariables = await routerApi.get(`/router/644aa97731be6731634da3ff`)
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

