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

const obj1 = {
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
const obj2 = {
    pf:{
        getViability: true,
        extras:{
            addressType:{
                condominio:{
                    condominiumName: false
                }
            }
        }
    }
}
let result = mergeObjects(obj1, obj2)
console.log(JSON.stringify(result, 4, 2))