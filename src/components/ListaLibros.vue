<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBibliotecaStore } from '@/stores/biblioteca'
import type { Libro } from '@/interfaces/libros'

const store = useBibliotecaStore()

const isLoading = computed(() => store.isLoading)
const allBooks = ref<Libro[]>()
const libros = computed(() => store.data)

//Inicio los datos de allBooks
allBooks.value = libros.value

const librosAlfabeticamente = computed(() => store.sortAlphabetically)
const autorAlfabeticamente = computed(() => store.sortAlphabeticallyAuthor)
const ordenPaginas = computed(() => store.sortByAPages)

//Funcion que recibe un id y cambia la disponibilidad del libro que correscponda
const switchDisponible = (id:number):void => {
    const libroEncontrado = libros.value.find((b) => b.id === id)
    if (libroEncontrado) {
        libroEncontrado.disponible = !libroEncontrado.disponible
    }else{
        alert("ID no encontrado")
    }
}

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
        <div v-for="libro in allBooks" :key="libro.id" class="sm:w-full md:w-1/3 flex flex-col p-3">
            <div :class="libro.disponible?'bg-zinc-300 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col':'bg-red-400 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col'">
                <div class="p-4 flex-1 flex flex-col text-center">
                    <h2 class="mb-4 text-zinc-900 text-2xl"> {{libro.id}} - {{ libro.titulo }}</h2>
                    <div class="mb-4 text-zinc-900 text-sm flex-1">
                        <h4>Escrito por <strong>{{ libro.autor }}</strong></h4>
                        <p>Total paginas: <strong>{{ libro.paginas }}</strong></p>
                        <p :class="libro.disponible ? 'text-emerald-900' : 'text-zinc-950'"><strong>{{ libro.disponible ? "Actualmente disponible" : "No se encuentra disponible"}}</strong></p>
                    </div>
                    <button class="rounded-sm hover:bg-blue-800 text-zinc-950 bg-blue-600" @click="switchDisponible(libro.id)">{{ libro.disponible ? "Prestar libro" : "Devolver libro" }}</button>
                </div>
            </div>  
        </div>
        <div class="flex justify-center items-center w-full">
            <button class="m-2 p-2 rounded-sm text-zinc-950 bg-cyan-900" @click="orderBooks('alphabetTitle')">Ordenar Alfabeticamente</button>
            <button class="m-2 p-2 rounded-sm text-zinc-950 bg-cyan-900" @click="orderBooks('alphabetAuthor')">Ordenar por autor(alfabeticamente)</button>
            <button class="m-2 p-2 rounded-sm text-zinc-950 bg-cyan-900" @click="orderBooks('pages')">Ordenar por numero de paginas</button>
        </div>
    </div>
    
    
</section>

</template>

<style scoped>

</style>