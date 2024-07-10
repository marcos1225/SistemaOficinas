<template>
    <div class="container">
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> Crear oficina </h2>
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> {{ this.offices.precio }}</h2>

        <!-- Div uno-->
        <v-form class="mt-10" @submit.prevent="agregarOficina">
        <div class="div-uno" style="width: 55%; display: inline-block; margin-right: 20px;">
            <v-text-field variant="solo-filled" class="mb-5" label="Precio" type="number" v-model="Precio"  />
            <v-text-field variant="solo-filled" class="mb-5" label="Dimensiones" v-model="Dimensiones" />
            <v-text-field variant="solo-filled" class="mb-5" label="Numero de cubiculos" type="number" v-model="NumeroCubiculos"/>
            <v-text-field variant="solo-filled" class="mb-5" label="Direccion" v-model="Direccion"  />

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
                <div class="botones">
                <v-btn type="submit" color="blue-darken-1" class="mr-5">
                    Aceptar
                </v-btn>
                <v-btn color="blue-darken-1" class="mr-5"  :to="{ name: 'home' }">
                    Regresar
                </v-btn>
            </div>
            </div>
            </v-form>
            
        </div>

   
</template>


<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            Precio: '',
            IdOficina: '',
            Direccion: '',
            Dimensiones: '',
            NumeroCubiculos: '',
            aireAc: '',
            cafet: '',
            coch: '',
            bano: '',

            aireAcondicionado: false,
            banoPrivado: false,
            cafetera: false,
            cochera: false,

            Direccion: '',
            offices: []
        };
    },
    methods: {
       

       
        async agregarOficina() {
            
            if (!this.Precio || !this.Direccion || !this.Dimensiones || !this.NumeroCubiculos) {
        Swal.fire(
          'Campos incompletos',
          'Por favor, complete todos los campos requeridos.',
          'error'

        );
        return;
      }
                if (this.aireAcondicionado == true){ this.aireAcondicionado = 1}
                else {this.aireAcondicionado = 0}

                if (this.banoPrivado == true){ this.banoPrivado = 1}
                else {this.banoPrivado = 0}

                if (this.cafetera == true){ this.cafetera = 1}
                else {this.cafetera = 0}

                if (this.cochera == true){ this.cochera = 1}
                else {this.cochera = 0}

            const formData = new FormData();

            formData.append('precio', this.Precio);
            formData.append('dimensiones', this.Dimensiones);
            formData.append('direccion', this.Direccion);
            formData.append('cafetera', this.cafetera);
            
            formData.append('banoPrivado', this.banoPrivado);
            formData.append('aireAcondicionado', this.aireAcondicionado );
            formData.append('cafetera', this.cafetera);
            formData.append('cochera',  this.cochera);
            formData.append('numeroCubiculos', this.NumeroCubiculos);

            axios
                .post(`http://localhost:8000/api/RegistrarOficina`, formData)
                .then((response) => {
                    console.log("Ingreso correctamente hecho:", response);
                    Swal.fire(
              'Ingreso',
              'La oficina ha sido ingresada exitosamente',
              'success',
            );
                })
                .catch((error) => {
                    console.error("Error al agregar la propiedad:", error.response);
                    
                });
        }

    },

}
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
.botones {
    display: flex;
}

</style>
