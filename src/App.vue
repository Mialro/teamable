<template>
    <div v-show="isEditMode">
        <h1>User profile</h1>
        <img :src="myImage" />
        <span>Name: </span><b id="name">{{name}}</b>
        <hr />
        <span>Email: </span><b id="email">{{email}}</b>
        <hr />
        <span>Interests: </span><b id="interests">{{interest}}</b>
        <hr />
        <button @click="handleEditProfile">Edit Profile</button>
    </div>
    
    <div v-show="!isEditMode">
        <h1>User profile</h1>
        <img :src="myImage" />
        <span>Name: </span><input id="input-name" type="text" v-model="name" />
        <hr />
        <span>Email: </span><input id="input-email" type="text" v-model="email" />
        <hr />
        <span>Interests: </span><input id="input-interests" type="text" v-model="interest" />
        <hr />
        <button @click="handleUpdateProfile">Update Profile</button>
    </div>
</template>

<script>
    import image from './profile.jpeg'
    export default {
        name: "App",
        data(){
            return {
                myImage: image,
                name: "",
                email: "",
                interest: "",
                isEditMode: true
            }
        },

        async created(){
            const jsonResponse = await this.fetchProfile()
            this.name = jsonResponse.name
            this.email = jsonResponse.email
            this.interest = jsonResponse.interest
        },

        methods: {
            handleEditProfile(){
                this.isEditMode = false
            },

            async handleUpdateProfile(){
                this.isEditMode = true

                const payload = {
                    myName: this.name,
                    myEmail: this.email,
                    myInterest: this.interest
                }

                const jsonResponse = await this.updateProfile(payload)
                console.log(jsonResponse);
            },

            async fetchProfile(){
                const res = await fetch('get-profile', {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })

                const resObj = await res.json();
                console.log(resObj);
                return resObj
            },

            async updateProfile(payload){
                const res = await fetch('update-profile', {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })

                const resObj = await res.json()
                return resObj
            }

        }
    }
</script>

<style>
    img {
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 30px;
    }

    div {
        width: 80%;
        margin: 40px auto;
    }

    hr {
        width: 75%;
        margin: 25px 0px;
    }

    button {
        height: 45px;
        width: 150px;
        border-radius: 5px;
        font-size: 15px;
    }

    input {
        width: 200px;
        font-size: 15px;
        padding: 10px;
        border-radius: 5px;
    }

    button:hover {
        cursor: pointer;
    }
</style>