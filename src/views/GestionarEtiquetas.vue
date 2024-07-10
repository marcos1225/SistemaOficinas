<template>
    <div class="container">
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> Gestionar etiquetas de oficina: {{
            this.idDelaOficina }}</h2>
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> {{ this.offices.precio }}</h2>

        <!-- Div uno-->
        <v-form class="mt-10" @submit.prevent="editarEtiquetas">
        <div class="div-uno" style="width: 55%; display: inline-block; margin-right: 20px;">
            <v-text-field variant="solo-filled" class="mb-5" label="Id de la oficina" v-model="IdOficina" disabled />
            <v-text-field variant="solo-filled" class="mb-5" label="Precio" v-model="Precio" disabled />
            <v-text-field variant="solo-filled" class="mb-5" label="Dimensiones" v-model="Dimensiones" disabled />
            <v-text-field variant="solo-filled" class="mb-5" label="Numero de cubiculos" v-model="NumeroCubiculos"
                disabled />
            <v-text-field variant="solo-filled" class="mb-5" label="Direccion" v-model="Direccion" disabled />

        </div>

        <!-- Div dos-->
        <div class="div-uno" style="width: 25%; display: inline-block; margin-left: 100px;">
           
                <v-checkbox color="success" class="text-h4 font-weight-bold" v-model="aireAcondicionado"
                    label="Aire acodicionado"></v-checkbox>
                <v-checkbox color="success" class="text-h4 font-weight-bold" v-model="banoPrivado"
                    label="Baño privado"></v-checkbox>
                <v-checkbox color="success" class="text-h4 font-weight-bold" v-model="cafetera"
                    label="Cafetera"></v-checkbox>
                <v-checkbox color="success" class="text-h4 font-weight-bold" v-model="cochera" label="Cochera"></v-checkbox>

                <v-btn type="submit" color="blue-darken-1" class="mr-5">
                    Aceptar
                </v-btn>
                <v-btn color="blue-darken-1" class="mr-5" :to="{ name: 'home' }">
                    Regresar
                </v-btn>
              </div>
            </v-form>
        

    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      Precio: '',
      IdOficina: '',
      Direccion: '',
      Dimensiones: '',
      NumeroCubiculos: '',
      aireAcondicionado: false,
      banoPrivado: false,
      cafetera: false,
      cochera: false,
      Direccion: '',
      offices: [],
    };
  },
  methods: {
    async getOffices() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/ObtenerOficinaPorId/${this.idDelaOficina}`
      );
      this.offices = response.data;
      this.Precio = this.offices[0].precio;
      this.IdOficina = this.offices[0].id;
      this.Direccion = this.offices[0].direccion;
      this.Dimensiones = this.offices[0].dimensiones;
      this.NumeroCubiculos = this.offices[0].numeroCubiculos;

      if (this.offices[0].banoPrivado === true) {
        this.banoPrivado = true;
      } else {
        this.banoPrivado = false;
      }

      if (this.offices[0].cochera === true) {
        this.cochera = true;
      } else {
        this.cochera = false;
      }

      if (this.offices[0].cafetera === true) {
        this.cafetera = true;
      } else {
        this.cafetera = false;
      }

      if (this.offices[0].aireAcondicionado === true) {
        this.aireAcondicionado = true;
        
      } else {
        this.aireAcondicionado = false;
        
      }
    },

    capturaDeOficinaAEditar() {
      const route = useRoute();
      this.idDelaOficina = route.params.id;
    },

    async editarEtiquetas() {
  const formData = new FormData();
  formData.append('aireAcondicionado', this.aireAcondicionado !== null ? (this.aireAcondicionado ? 1 : 0) : 0);
  console.log('aireAcondicionado:', this.aireAcondicionado);
  formData.append('cafetera', this.cafetera !== null ? (this.cafetera ? 1 : 0) : 0);
  console.log('cafetera:', this.cafetera);
  formData.append('cochera', this.cochera !== null ? (this.cochera ? 1 : 0) : 0);
  console.log('cochera:', this.cochera);
  formData.append('banoPrivado', this.banoPrivado !== null ? (this.banoPrivado ? 1 : 0) : 0);
  console.log('banoprivado:', this.banoPrivado);

  axios
    .put(
      `http://localhost:8000/api/ActualizarEtiquetas/${this.idDelaOficina}`,
      formData
    )
    .then((response) => {
      console.log('Ingreso correctamente hecho:', response);
    })
    .catch((error) => {
      console.error('Error al editar la propiedad:', error.response);
    });
},
  },
  created() {
    this.capturaDeOficinaAEditar();
    this.getOffices();
  },
};
</script>


<style>
.text-white {
    color: white;
}

.container {
    background-image: url('/Fondo.avif');
    background-size: cover;
    padding: 90px;
    margin-top: 10px;
}

</style>
