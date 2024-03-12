let  isInvalidEmail = function (testPayload){
    return !testPayload.myEmail.includes("@")
}

let isEmptyPayload = function(testPayload){
    return Object.keys(testPayload).length == 0
}

module.exports = {isInvalidEmail, isEmptyPayload}