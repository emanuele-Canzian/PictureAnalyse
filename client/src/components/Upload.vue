<template>
  <div class="upload pa-6">
    <!-- Start Input Form -->
    <v-form enctype="multipart/form-data" method="POST" class="pb-3">
      <div class="upload__form">
    <input
           class="pb-3 upload__input"
           name="pictureField"
           type="file"
           @change="onFileSelected(items,$event)"
           accept="image/jpeg, image/png, image/jpg"
    />
    <v-btn @click="onUpload" class="upload__btn primary">Upload</v-btn>
      </div>
    </v-form>
    <!-- End Input Form  -->
    <p class="pl-4">{{this.items.message}}</p>
    <div class="upload__image">
    <v-img class=" pa-2" :src="items.image"/>
    </div>
    <!-- Start Table -->
    <template v-if="this.items.googleData.length !== 0">
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
            <td>{{ (item.score * 100).toFixed(2) }} %</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <!-- End Table -->
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
        googleData:[],
        message:"",
      },

  }),
    methods:{
      onFileSelected(items,event){
        var files = event.target.files || event.dataTransfer.files;
        if (!files.length){
          console.log(files)
          return;
        }
        if (files[0]['type']==='image/jpeg' || files[0]['type']==='image/png' || files[0]['type']==='image/jpg'){
          this.createImage(items,files[0]);
          this.items.selectedFile = event.target.files[0];
          this.items.message = "";
          this.items.googleData = [];
        }else {
          this.items.message = "not support this file type";
          this.items.image = "";
          this.items.selectedFile = "";
          this.items.googleData = [];
        }
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
          if (this.items.selectedFile === "")
          {
            this.items.message = "no picture selceted"
          }
          else
            {
              this.items.message = "";
             await axios
            .post(`http://localhost:8081/upload` ,formData)
            .then((response) => {
              this.items.googleData = response.data.data;
            })
            .catch((error) => {
              console.error('File not uploaded', error);
            });}

        }



    }
  }

</script>

<style lang="scss" scoped>
  @import "src/assets/styles/components/Upload";
</style>