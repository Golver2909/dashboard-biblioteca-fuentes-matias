<script setup lang="ts">
import type { Libro } from '@/interfaces/libros';
import { defineProps } from 'vue';
import Swal from 'sweetalert2';

const props=defineProps<{libro:Libro}>()

//Funcion que recibe un id y cambia la disponibilidad del libro que correscponda
const switchDisponible = (id:number):void => {

    props.libro.disponible = !props.libro.disponible
    
        Swal.fire({
            title: props.libro.disponible ? 
                "Libro devuelto" :
                "Libro prestado",
            text: props.libro.disponible ? 
                `El libro '${props.libro.titulo}' fue devuelto a la biblioteca` :
                `El libro '${props.libro.titulo}' fue prestado`
            ,
            icon: "info",
            confirmButtonColor: "#065f46",
            background:"#292524",
            color:"#ecfeff"
        })
    
    
    
}

</script>

<template>
    <div class="sm:w-full md:w-1/3 flex flex-col p-3">
            <div :class="props.libro.disponible?'bg-zinc-300 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col':'bg-red-400 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col'">
                <div class="p-4 flex-1 flex flex-col text-center">
                    <h2 class="mb-4 text-zinc-900 text-2xl"> {{ props.libro.titulo }}</h2>
                    <div class="mb-4 text-zinc-900 text-sm flex-1">
                        <h4>Escrito por <strong>{{ props.libro.autor }}</strong></h4>
                        <p>Total paginas: <strong>{{ props.libro.paginas }}</strong></p>
                        <p :class="props.libro.disponible ? 
                        'text-emerald-900' : 
                        'text-zinc-950'">
                            <strong>{{ props.libro.disponible ? "Actualmente disponible" : "No se encuentra disponible"}}</strong>
                        </p>
                    </div>
                    <button class="rounded-sm hover:bg-blue-800 text-zinc-950 bg-blue-600" @click="switchDisponible(libro.id)">
                        {{ props.libro.disponible ? "Prestar libro" : "Devolver libro" }}
                    </button>
                </div>
            </div>  
        </div>
</template>