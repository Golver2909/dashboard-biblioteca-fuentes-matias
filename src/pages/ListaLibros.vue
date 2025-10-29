<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBibliotecaStore } from '@/stores/biblioteca'
import type { Libro } from '@/interfaces/libros'
import Swal from 'sweetalert2'
import CardLibro from "@/components/CardLibro.vue";


const store = useBibliotecaStore()

const isLoading = computed(() => store.isLoading)
const allBooks = ref<Libro[]>()
const libros = computed(() => store.data)

//Inicio los datos de allBooks
allBooks.value = libros.value

const librosAlfabeticamente = computed(() => store.sortAlphabetically)
const autorAlfabeticamente = computed(() => store.sortAlphabeticallyAuthor)
const ordenPaginas = computed(() => store.sortByAPages)



//Funcion para ordenar los libros segun el parametro
const orderBooks = (order:string):void => {
    if (order === "alphabetTitle") {
        allBooks.value = librosAlfabeticamente.value
        return
    }
    if (order === "alphabetAuthor") {
        allBooks.value = autorAlfabeticamente.value
        return
    }
    if (order === "pages") {
        allBooks.value = ordenPaginas.value
        return
    }
    if(order === "original"){
        allBooks.value = libros.value
    }
}

//Al renderizar la vista, se ejecuta inmediatamente una funcion para obtener los datos iniciales(manejamos tambien 'isLoading')
onMounted(() => {
    if (store.isLoading) {
        store.fetchInitialData()
    }
})

</script>

<template>
<section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
    <header class="mb-6 border-b border-zinc-700 pb-3 flex justify-between items-center">
        <h2 class="text-2xl font-semibold tracking-wide">Libros en la biblioteca</h2>
    </header>

    <div v-if="isLoading" class="text-center py-6 text-zinc-400">
        Cargando...
    </div>

    <div v-else-if="libros.length === 0" class="text-center py-6 text-zinc-500 italic">
        No existen libros dentro de esta biblioteca
    </div>
    <div v-else class="space-y-4 flex flex-wrap">
        <CardLibro v-for="libro in allBooks" :key="libro.id" :libro="libro"/>
        
        <!-- Div con botones para aplicar los filtros -->
        <div class="flex justify-center items-center w-full">
            <button class="m-2 p-2 rounded-sm hover:bg-cyan-950 text-zinc-950 bg-cyan-800" @click="orderBooks('alphabetTitle')">Ordenar Alfabeticamente</button>
            <button class="m-2 p-2 rounded-sm hover:bg-cyan-950 text-zinc-950 bg-cyan-800" @click="orderBooks('alphabetAuthor')">Ordenar por autor(alfabeticamente)</button>
            <button class="m-2 p-2 rounded-sm hover:bg-cyan-950 text-zinc-950 bg-cyan-800" @click="orderBooks('pages')">Ordenar por numero de paginas</button>
            <button class="m-2 p-2 rounded-sm hover:bg-cyan-950 text-zinc-950 bg-cyan-800" @click="orderBooks('original')">Orden original</button>
        </div>
    </div>
    
    
</section>

</template>

<style scoped>

</style>