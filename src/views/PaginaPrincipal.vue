<template>
    <div >
        <h2 class="text-center text-h3 my-5 font-weight-bold  mt-5 "> Reservar oficinas</h2>
       

        <v-card  class="mx-auto mt-10" flat width="1310" >
            <v-list class="overflow-y-auto"  >
                <v-list-item  v-for="(office, index) in offices" :key="index"  border height="110" >

                    <!-- Aquí muestra la información de la oficina -->
                    <v-list-item-title> Id de la oficina: {{ office.id }}</v-list-item-title>

                    <template v-slot:append>

                        <v-btn color="green-lighten-1" class="mr-2"
                        :to="{ name: 'ver-detalle', params: { id: office.id } }" 
                        >
                            imagenes de oficina
                        </v-btn>

                        <v-btn color="pink-lighten-1" class="mr-2" disabled style="width: 158px;">
                            Reservar oficina
                        </v-btn>

                        <v-btn color="blue-darken-1" class="mr-3" disabled>
                            Dejar reseña
                        </v-btn >

                            <!-- -->
                        <v-btn color="orange-lighten-2" class="mr-3"
                            :to="{ name: 'gestionar-etiquetas', params: { id: office.id } }" disabled>
                            Gestionar etiquetas
                        </v-btn>
                        <v-btn color="orange-darken-2" class="mr-5"
                            :to="{ name: 'gestionar-oficinas', params: { id: office.id } }">
                            editar oficina
                        </v-btn>
                        <v-btn color="deep-orange-accent-4" class="mr-14"
                        @click="borrarOficina(office.id)">
                             Eliminar
                        </v-btn>
                        
                                    <!-- -->

                    </template>

                </v-list-item>
            </v-list>


        </v-card>

    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            offices: []
        };
    },
    methods: {
          async getOffices() {
            const response = await axios.get('http://127.0.0.1:8000/api/ObtenerOficinas')
            this.offices = response.data
            console.log(this.offices)
        },
   
        async borrarOficina(id) {
  try {
    if (confirm("¿Confirma eliminar el registro?")) {
      const response = await axios.delete(`http://127.0.0.1:8000/api/EliminarOficina/${id}`);
      console.log(response); // Agrega esta línea para ver la respuesta del servidor
      this.offices = response.data;
      console.log(this.offices);
      
      // Recargar la página
      window.location.reload();
    }
  } catch (error) {
    console.error("Error al eliminar la oficina:", error.message);
  }
}
}, 
        created() {
        this.getOffices()
    }
   
}
</script>
