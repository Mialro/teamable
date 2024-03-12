const {isInvalidEmail, isEmptyPayload} = require('../validator')

test('valid Email', function(){
    const testPaylod = {
        myName: "test name",
        myEmail: "test@mail.com",
        myInterest: "Devops"
    }
    const result = isInvalidEmail(testPaylod)
    expect(result).toBe(false)
})

test('invalid Email', function(){
    const testPaylod = {
        myName: "test name",
        myEmail: "testmail.com",
        myInterest: "Devops"
    }
    const result = isInvalidEmail(testPaylod)
    expect(result).toBe(true)
})

test('empty payload', function(){
    const testPaylod = {}
    const result = isEmptyPayload(testPaylod)
    expect(result).toBe(true)
})

test('non-empty payload', function(){
    const testPaylod = {
        myName: "test name",
        myEmail: "test@mail.com",
        myInterest: "Devops"
    }
    const result = isEmptyPayload(testPaylod)
    expect(result).toBe(false)
})
