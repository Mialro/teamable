const request = require('supertest')
const {app, server} = require('../server')

test("request with valid payload", async function(){
    const testPayload = {
        myName: "update test",
        myEmail: "updatetest@mail.com",
        myInterest: "Programming"
    }

    const response = await request(app).post('/update-profile').send(testPayload)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('info')
    expect(response.body.info).toBe('Profile updated successfully')

    server.close()
})


test("request with invalid payload", async function(){
    const testPayload = {}
    const response = await request(app).post('/update-profile').send(testPayload)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe("Invalid payload. We couldn't update user profile")

    server.close()
})


