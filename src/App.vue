<script setup>
  import {  RouterView } from 'vue-router'

  
</script>

<template>
<v-card max-width="1300" class="mx-auto" style="margin-top: 10px;" color="white">

<v-layout>

    <v-app-bar color="light-blue" class="mx-auto " height="120" :fixed="true" >

        <!-- Lado Derecho-->
        <template v-slot:prepend>

            <v-btn :to="{ name: 'crear-oficina' }" width="200" height="70" style="border-radius: 40px;"  >
  
 Crear Oficinas

</v-btn>

        </template>

    </v-app-bar>

    <v-main >
        <v-container>
            <RouterView />
        </v-container>
    </v-main>

   
</v-layout>
</v-card>
</template>
