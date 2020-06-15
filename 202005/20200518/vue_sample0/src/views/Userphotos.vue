<template>
    <div class="file_upload">
        <br>
        <p>Upload Area</p>
        <div id="file_upload">
        <input type="file" class="form-control" @change="selectFile">
            <button type="submit" class="btn btn-outline-success" v-on:click="upload"> Upload!</button>
        </div>
        <div id="imgSample"></div>
    </div>

</template>
<script>
import firebase from 'firebase'
export default {
    data: {
        uploadFile: null,
        infoMsg: null,
    },
    methods: {
        selectFile: function (e) {
            // e.preventDefault();
            let files = e.target.files;
            this.uploadFile = files[0];
        },
        upload: function () {
            if (!this.uploadFile) {
                this.infoMsg = 'choose your upload file!'
                return;
            }
            var storageRef = firebase.storage().ref().child('user/' + this.uploadFile.name);
            storageRef.put(this.uploadFile).then(function (snapshot) {
                console.log('Uploaded a file!');
                storageRef.getDownloadURL().then(function(url){
                console.log("imgSample "+url);
                document.getElementById("imgSample").style.backgroundImage = "url("+url+")";
                document.getElementById("imgSample").style.backgroundSize = "cover";
                })
            });
        }
    }
}
</script>
<style scoped>
    .file_upload {
        text-align: center;
        width: 500px;
        height: 300px;
        margin-top: 250px;
        margin-left: auto;
        margin-right: auto;
        background-color:lavender;
    }
    .form-control {
        padding-top: 75px;
    }
    #imgSample {
        width: 100px;
        height: 100px;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
    }
</style>