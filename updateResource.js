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
    async function variables(id){
        return listVariablesResource.variablesResource(id);
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

    //   async function updateVariableOfAllRouter2(id){
    //     //let data = await listRoutersByNameAndId()
    //     let data = [{id: "644aa97731be6731634da3ff", name: "supercabotest"}, {
    //         id: "637b96fe5d497e2148d9265d", name: "ageroutertest"}]
    //     for (let value of data) {
    //         let variablesResource = await variables(value.id)
    //         //  return console.log(JSON.stringify(variablesResource.addressFields.pf))
    //         variablesResource.addressFields.pf.extras.addressType.condominio.condominiumName = true;
    //         routerApi.patch(`/router/settings/add-variables/${value.id}`, {
    //             variables:{
    //                 addressFields: variablesResource.addressFields,
    //                 syncBlip: false
    //         }
    //         }).then(response => {
    //             console.log(response.status);
    //             console.log("Atualização bem sucedida");
    //             console.log("Novo valor da variável: ", JSON.stringify(response.data.data.variables.addressFields));
    //         })
    //   }
    // }
    //   updateVariableOfAllRouter2()



    function mergeObjects(obj1, obj2) {
        let newObj = { ...obj1 }
        for (const prop in obj2) {
            if (obj2.hasOwnProperty(prop)) {
                if (
                    typeof obj2[prop] === 'object' &&
                    obj2[prop] !== null &&
                    typeof obj1[prop] === 'object' &&
                    obj1[prop] !== null
                ) {
                    newObj[prop] = mergeObjects(obj1[prop], obj2[prop])
                } else {
                    newObj[prop] = obj2[prop]
                }
            }
        }
        return newObj
    }


    async function updateVariableOfAllRouter3(){
        const obj2 = {
            "addressFields": {
                "pf": {
                    "zipCode": false,
                    "checkIsGeneral": false,
                    "addressType": true,
                    "addressNumber": false,
                    "complement": true,
                    "addressReference": true,
                    "getViability": false,
                    "extras": {
                      "addressType": {
                        "condominio": {
                          "condominiumName": true,
                          "apartmentNumber": false,
                          "apartmentBlock": false
                        }
                      }
                    }
                  },
                  "pj": {
                    "zipCode": false,
                    "checkIsGeneral": false,
                    "addressType": true,
                    "addressNumber": false,
                    "complement": true,
                    "addressReference": true,
                    "getViability": false,
                    "extras": {
                      "addressType": {
                        "condominio": {
                          "condominiumName": true,
                          "apartmentNumber": true,
                          "apartmentBlock": true
                        }
                      }
                    }
                }
            }
          }
        //let data = await listRoutersByNameAndId()
        let data = [{id: "644aa97731be6731634da3ff", name: "supercabotest"},
                    {id: "637b96fe5d497e2148d9265d", name: "ageroutertest"},
                    {id: "63ced415ab44d3230752c1bb", name: "alaresRouterTest"},
                    {id: "627e3bb503907d678b2da6f5", name: "algarRouterTest"},
                    {id: "627d1650fca07b90f41f596d", name: "aonetRouterTest"}]
        for (let value of data) {
            let variablesResource = await variables(value.id)
            let newObj = mergeObjects(variablesResource, obj2)
            //console.log(newObj.addressFields);
            //  return console.log(JSON.stringify(variablesResource.addressFields.pf))
            //variablesResource.addressFields.pf.extras.addressType.condominio.condominiumName = true;
            let addressFields = newObj.addressFields
            routerApi.patch(`/router/settings/add-variables/${value.id}`, {
                variables:{
                    addressFields
            }
            }).then(response => {
                console.log(response.status);
                console.log("Atualização bem sucedida");
                //console.log("Novo valor da variável: ", JSON.stringify(response.data.data.variables.addressFields));
            })
      }
    }
    updateVariableOfAllRouter3();
    } catch (error) {
    console.log(error)
    }