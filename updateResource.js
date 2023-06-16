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
    async function variables(){
        return listVariablesResource.variablesResource();
    }
    // variables().then(data=>console.log(data));

    /*LISTAR TODOS OS ROUTERS DE ISP VENDAS*/
    async function routers(){
        return listRouters.listRouter()
    }

    /*PEGAR O ID E NOME DE TODOS OS ROUTERS DO PROJETO ISP VENDAS*/
    async function listRoutersByNameAndId() {

        let refactorList = await routers().then(data=>{
            let list = data
            let newData = [];
            for (let value of list) {
                newData.push({
                    id: value._id,
                    name: value.name
                })
              }
              return newData
        });
        //console.log(refactorList);
        return refactorList
    }
    //listRoutersByNameAndId()
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
        let data = await listRoutersByNameAndId()
        for (let value of data) {
        routerApi.patch(`/router/settings/add-variables/${value.id}`, {
            variables: {
                blockedPhoneNumbers: "[\"553799999998\",\"5513974255154\",\"5513991688975\",\"5513996230639\",\"5513991552083\",\"5513981442153\"]"
            },
            syncBlip: true
            }
        ).then(response => {
            console.log(response.status);
            console.log("Atualização bem sucedida");
            console.log("Novo valor da variável: ", response.data.data.variables.blockedPhoneNumbers);
        })
    }
    /*
        //USAR PARA FINS DE TESTES
        data = [{id: "644aa97731be6731634da3ff", name: "test"}]
        for (let value of data) {
            routerApi.patch(`/router/settings/add-variables/${value.id}`, {
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
        */
      }
      //updateVariableOfAllRouter();
    } catch (error) {
    console.log(error)
    }



