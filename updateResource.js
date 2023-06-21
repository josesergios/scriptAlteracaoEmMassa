const axios = require('axios')
const listRouters = require('./listRouters')
const listVariablesResource = require('./listVariablesResource')
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
                if(value.enabledChannels.length != 0){
                    newData.push({
                        id: value._id,
                        name: value.name
                    })
                  }
                }
                return newData
        });
        //console.log(refactorList);
        return refactorList
    }
    // listRoutersByNameAndId()
    async function updateVariableByRouterById(id) {
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
    //   updateVariableByRouterById("644aa97731be6731634da3ff");

    async function updateVariableOfAllRouter(){
        //let data = await listRoutersByNameAndId()
    //     for (let value of data) {
    //     routerApi.patch(`/router/settings/add-variables/${value.id}`, {
    //         variables: {
    //             blockedPhoneNumbers: "[\"553799999998\",\"5513974255154\",\"5513991688975\",\"5513996230639\",\"5513991552083\",\"5513981442153\"]"
    //         },
    //         syncBlip: false
    //         }
    //     ).then(response => {
    //         console.log(response.status);
    //         console.log("Atualização bem sucedida");
    //         console.log("Novo valor da variável: ", response.data.data.variables.blockedPhoneNumbers);
    //     })
    // }


        //USAR PARA FINS DE TESTES
        let data = [{id: "644aa97731be6731634da3ff", name: "supercabotest"}, {
        id: "637b96fe5d497e2148d9265d", name: "ageroutertest"}]
        for (let value of data) {
            routerApi.patch(`/router/settings/add-variables/${value.id}`, {
                variables: {
                    blockedPhoneNumbers: "[\"553799999998\",\"5513974255154\",\"5513991688975\",\"5513996230639\",\"5513991552083\",\"5513981442153\"]"
                },
                syncBlip: false
                }
            ).then(response => {
                console.log(response.status);
                console.log("Atualização bem sucedida no bot: ", value.name);
                console.log("Novo valor da variável: ", response.data.data.variables.blockedPhoneNumbers);
            })
        }
      }
      //updateVariableOfAllRouter();

      async function updateVariableOfAllRouter2(id){
        let variablesResource = await variables()
        variablesResource.addressFields.pf.extras.addressType.condominio.condominiumName = true;
        //  return console.log(JSON.stringify(variablesResource.addressFields.pf))
        routerApi.patch(`/router/settings/add-variables/${id}`, {
            variables:{
                addressFields: variablesResource.addressFields,
                syncBlip: false
          }
        }).then(response => {
            console.log(response.status);
            console.log("Atualização bem sucedida");
            console.log("Novo valor da variável: ", JSON.stringify(response.data.data.variables.addressFields));
        })
      }
      updateVariableOfAllRouter2('644aa97731be6731634da3ff')
    } catch (error) {
    console.log(error)
    }