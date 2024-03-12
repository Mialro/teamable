const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const {isInvalidEmail, isEmptyPayload} = require('./validator')

const app = express()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DEV_ENV = process.env.DEV_ENV

const url = DEV_ENV ? "mongodb://127.0.0.1:27017" : `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017?authSource=company_db`

const client = new MongoClient(url)

const dbName = "company_db"
const collName = "employees"


app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist/'))

app.get('/get-profile', async (req, res) => {
    console.log(req.url);

    await client.connect()
    const db = client.db(dbName)
    const coll = db.collection(collName)

    const result = await coll.findOne({id: 1})

    client.close()

    console.log(result)

    let response = {}

    if(result == null){
        res.send(response)
    }
    else{
        response ={
            name: result.myName,
            email: result.myEmail,
            interest: result.myInterest
        }
        res.send(response)
    }

})

app.post('/update-profile', async (req, res) => {
    const payload = req.body
    console.log(payload);

    if(isEmptyPayload(payload) || isInvalidEmail(payload))
    {
        res.send({error: "Invalid payload. We couldn't update user profile"});
    }
    else
    {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collName)

        payload.id = 1
        const updatedValues = {$set: payload}
        await collection.updateOne({id: 1}, updatedValues, {upsert: true})

        await client.close()
        res.send({info: "Profile updated successfully"})
    }
    
})

const server = app.listen(3000, () => {
    console.log("App listening on port 3000");
})


module.exports = {app, server}