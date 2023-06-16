const axios = require('axios')
const listRouters = require('./listRouters')
const listVariablesResource = require('./listVariablesResource')

 const routerApi = axios.create({
     baseURL: `https://witcom-core.mundiale.com.br`,
     headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': '8c271044-96af-48ce-80fa-59bf9ef79f45'
    }
 })

try {
    /*LISTAR TODAS AS VARIÁVEIS DO RESOURCE*/
    let variables = async () => {
        return listVariablesResource.variablesResource();
    }
    // variables().then(data=>console.log(data));

    /*LISTAR TODOS OS ROUTERS DE ISP VENDAS*/
    let routers = async () => {
        return listRouters.listRouter()
    }

    /*Pegar o ID e NOME de todos os routes de ISP Vendas*/
    async function listRoutersByNameAndId() {
        routers().then(data=>{
            let listRouter = data
            let cont = 0
            for (let value of listRouter) {
                console.log(`Router name: ${value.name}\nRouter ID: ${value._id}`);
                console.log("");
                cont++;
              }
              console.log(`Total de ISPs: ${cont}`);
        });
    }
listRoutersByNameAndId()
    async function updateVariableByRouter(id) {
        routerApi.patch(`/router/settings/add-variables/${id}`, {
            variables: {
                blockedPhoneNumbers: "[\"553799999998\",\"5513974255154\",\"5513991688975\",\"5513996230639\",\"5513991552083\",\"5513981442153\"]"
            },
            syncBlip: false
          }
        ).then(response => {
            console.log(response.status);
            console.log("Atualização bem sucedida");
            console.log("Novo valor da variável: ", response.data.data.variables.blockedPhoneNumbers);
        })
      }
      //updateVariableByRouter("644aa97731be6731634da3ff");

    async function updateVariableOfAllRouter(){
        for (let value of listRouter) {
           console.log(value.name);
         }
    }

 } catch (error) {
   console.log(error)
 }



