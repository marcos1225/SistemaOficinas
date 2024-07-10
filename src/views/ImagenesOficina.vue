<template>
     
    <v-card max-width="800" flat class="mx-auto">
  
      <v-card-title class="text-h4 font-weight-bold mt-5" tag="h3" style="margin-left: 250px;">imagenes de Oficina: {{
        this.id }} </v-card-title>
      <v-card-subtitle class="text-h5 mt-5">gestione sus imagenes</v-card-subtitle>
  
  
      <!-- Area de  subido de imagenes-->
      <form @submit.prevent="ingresarImagenOficina" enctype="multipart/form-data" class="image-upload-form mt-8">
  
        <label class="custom-file-upload">
          <input type="file" name="imagen" accept="image/*" ref="imagen" />
          <i class="fas fa-cloud-upload-alt"></i> Seleccionar imagen
        </label>
        <button type="submit" class="image-upload-button mb-5 mt-5">Ingresar Imagen</button>
      </form>
  
      <!-- Area para presentar las imagenes de la oficiona-->
      <div>
        <v-list>
          <v-list-item v-for="(imageInfo, index) in ImagenesInformacion" :key="imageInfo.id">
            
            <!-- Mostrar el idImagenes -->
            <v-list-item-content>
              <div>ID de la imagen: {{ imageInfo.id }}</div>
  
            </v-list-item-content>
  
            <v-img :src="officeImages[index]" max-height="200"></v-img>
  
            <v-list-item-action>
              <v-btn @click="eliminarImagen(imageInfo.id)" class="mt-8" color="red lighten-2">Eliminar</v-btn>
            </v-list-item-action>
            
  
          </v-list-item>
  
        </v-list>
      </div>
  
      <v-btn color="green" class="mt-8" :to="{ name: 'home' }" style="margin-left: 250px;">
    Volver a la ventana anterior
</v-btn>

    </v-card>

  </template>       
  
  <script>
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        id: '',
        propertyId: null,
        ImagenesInformacion: [],
        officeImages: [], 
      };
    },
    mounted() {
      this.fetchImagesForOffice();  
    },
    methods: {
      eliminarImagen(idImagen) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará la imagen. No podrás deshacerla.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/api/EliminarImagen/${this.id}/imagenes/${idImagen}`)
              .then(() => {
                Swal.fire(
                  'Eliminada',
                  'La oficina ha sido eliminada exitosamente',
                  'success',
                );
                window.location.reload();
              })
              .catch((error) => {
                Swal.fire(
                  'Error',
                  'Hubo un error al eliminar la oficina. Inténtalo de nuevo.',
                  'error'
                );
  
                console.error(error);
              });
          }
        });
      },
      async fetchImagesForOffice() {
        try {
          const officeId = 'ID_DE_LA_OFICINA';       
          let response = await axios.get(`http://localhost:8000/api/MostrarImagen/${this.id}`);
  
          this.ImagenesInformacion = response.data.imagenes;
          console.log(this.ImagenesInformacion)
          
          if (response.data.imagenes && response.data.imagenes.length > 0) {
            this.officeImages = response.data.imagenes.map(img => `http://localhost:8000/images/${img.imagen}`);
          } else {
            this.officeImages = ['URL_IMAGEN_POR_DEFECTO'];
          }
        } catch (error) {
          console.error('Hubo un error al obtener las imágenes para la oficina:', error);
        }
      },
  
      async ingresarImagenOficina() {
        const formData = new FormData();
        formData.append('imagen', this.$refs.imagen.files[0]);
        try {
          const response = await axios.post(`http://localhost:8000/api/GuardarImagen/${this.id}/imagenes`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          Swal.fire(
            'Ingreso',
            'La imagen ha sido cargada exitosamente',
            'success',
          );
          window.location.reload();
  
        } catch (error) {
          console.error(error);
  
          Swal.fire(
            '¡Error al agregar la imagen!',
            `Detalle del error: ${error.response.data.message || 'No se pudo determinar el error.'}`,
            'error'
          );
  
        }
      },
      capturaDeOficinaAEditar() {
        const route = useRoute();
        this.id = route.params.id;
      },
    },
    created() {
      this.capturaDeOficinaAEditar();
    },
  };
  </script>
  
  <style scoped>
  .custom-file-upload {
    padding: 13px 20px;
    background-color: #1dbeb6;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  input[type="file"] {
    display: none;
  }
  
  .image-upload-button {
    margin-inline-start: 20px;
    padding: 10px 20px;
    background-color: rgb(101, 239, 80);
    color: #ffffff;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  </style>
  