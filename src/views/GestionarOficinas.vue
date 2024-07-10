<template>
    <div class="container">
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> Actualizar oficina: {{
            this.idDelaOficina }} </h2>
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 color: white"> {{ this.offices.precio }}</h2>
        <v-form class="mt-10" @submit.prevent="ActualizarOficina">
            <!-- Div uno-->
            <div class="div-uno" style="width: 55%; display: inline-block; margin-right: 20px;">
                <v-text-field variant="solo-filled" class="mb-5" label="Precio" type="number" v-model="Precio" />
                <v-text-field variant="solo-filled" class="mb-5" label="Dimensiones" v-model="Dimensiones" />
                <v-text-field variant="solo-filled" class="mb-5" label="Numero de cubiculos" type="number"
                    v-model="NumeroCubiculos" />
                <v-text-field variant="solo-filled" class="mb-5" label="Direccion" v-model="Direccion" />

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
                <v-btn type="submit" color="green-lighten-2" class="mr-5">
                    Aceptar
                </v-btn>
                <v-btn color="deep-orange-accent-4" class="mr-5" :to="{ name: 'home' }">
                    Volver
                </v-btn>

            </div>

        </v-form>

    </div>
</template>


<script>
import { useRoute } from 'vue-router';
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
            aireAcondicionado: false,
            banoPrivado: false,
            cafetera: false,
            cochera: false,
            aire: '',



            Direccion: '',
            offices: []
        };
    },
    methods: {
        async getOffices() {

            const response = await axios.get(`http://127.0.0.1:8000/api/ObtenerOficinaPorId/${this.idDelaOficina}`);
            this.offices = response.data
            this.Precio = this.offices[0].precio
            this.IdOficina = this.offices[0].id
            this.Direccion = this.offices[0].direccion
            this.Dimensiones = this.offices[0].dimensiones
            this.NumeroCubiculos = this.offices[0].numeroCubiculos
            
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
        async ActualizarOficina() {

            if (!this.Precio || !this.Direccion || !this.Dimensiones || !this.NumeroCubiculos) {
                Swal.fire(
                    'Campos incompletos',
                    'Por favor, complete todos los campos requeridos.',
                    'error'

                );
                return;
            }
          
            axios
                .put(`http://127.0.0.1:8000/api/ActualizarOficina/${this.idDelaOficina}`, {
                    precio: this.Precio,
                    dimensiones: this.Dimensiones,
                    aireAcondicionado: this.aireAcondicionado,
                    banoPrivado: this.banoPrivado,
                    cafetera: this.cafetera,
                    cochera: this.cochera,
                    direccion: this.Direccion,
                    numeroCubiculos: this.NumeroCubiculos
                })
                .then((response) => {
                    console.log("Actualizacion completada:", response);
                    console.log(this.aireAcondicionado, this.banoPrivado, this.cafetera, this.cochera);
                    Swal.fire(
                        'Actualizacion',
                        'La oficina fue actualizada con exito',
                        'success',
                    );
                })
                .catch((error) => {
                    console.error("Error al agregar la propiedad:", error.response);
                });
        }
    },
    created() {

        this.capturaDeOficinaAEditar();
        this.getOffices();

    },


}
</script>

<style>     .text-white {
         color: white;
     }

     .container {
         background-image: url('https://img.freepik.com/fotos-premium/espacio-interior-oficina-borrosa_93675-121105.jpg');
         background-size: cover;
         padding: 90px;
         margin-top: 10px;
     }
</style>
