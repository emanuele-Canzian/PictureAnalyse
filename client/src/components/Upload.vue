<template>
  <div>
    <v-form enctype="multipart/form-data" method="POST">
    <input name="pictureField" type="file" @change="onFileSelected(items,$event)" accept="image/jpeg, image/png, image/jpg">
    <v-btn @click="onUpload">Upload</v-btn>
    <v-img :src="items.image" height="400" width="500"/>
    </v-form>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Description</th>
            <th class="text-left">Score</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in items.googleData" :key="index">
            <td>{{ item.description }}</td>
            <td>{{ item.score * 100 }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>

  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "Upload",
    data: () => ({
      items:{
        image: "",
        selectedFile: "",
        googleData:[]
      },

  }),
    methods:{
      onFileSelected(items,event){
        var files = event.target.files || event.dataTransfer.files;
        if (!files.length){
          return;
        }
        this.createImage(items,files[0]);
        this.items.selectedFile = event.target.files[0];
      },
      createImage(items, file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          items.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async onUpload(){
        const formData = new FormData();

        formData.append('file',this.items.selectedFile);
        console.log(formData)
        await axios
        .post(`http://localhost:8081/upload` ,formData)

          .then((response) => {

            this.items.googleData = response.data.data;
            console.log(this.items.googleData)
          })
        .catch((error) => {
          console.error('File not uploaded', error);
        });

      }

    }
  }

</script>

<style scoped>

</style>