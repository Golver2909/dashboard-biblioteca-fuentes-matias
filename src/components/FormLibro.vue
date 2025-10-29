<script setup lang="ts">
import type { Libro } from '@/interfaces/libros';
import { useBibliotecaStore } from '@/stores/biblioteca';
import { ref } from 'vue';
import Swal from 'sweetalert2';

const storeBiblioteca = useBibliotecaStore()

const formModel = ref<Libro>({
    id : 0,
    titulo:"",
    autor:"",
    paginas:0,
    disponible:true
})

const visualMesagge = ref<string>()

const libroSubmit = ():void =>{
    storeBiblioteca.addBook({...formModel.value})
    //Valido por falsy
    if(!storeBiblioteca.error){
        
        visualMesagge.value = `Libro '${formModel.value.titulo}' agregado correctamente`
        setTimeout(() => (visualMesagge.value = ''), 3000)
    }else{
        setTimeout(() => (storeBiblioteca.error = ''),3000)
    }
}

</script>

<template>
    <section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
        <h2 class="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">
            Nuevo libro para la biblioteca
        </h2>
        <form @submit.prevent="libroSubmit" class="space-y-5">
            <div class="flex flex-col">
                <label class="text-zinc-400 text-lg mb-1" for="titulo">Titulo libro:</label>
                <input v-model="formModel.titulo" id="titulo" type="text"
                    class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required />
            </div>
            <div class="flex flex-col">
                <label class="text-zinc-400 text-lg mb-1" for="autor">Autor del libro:</label>
                <input v-model="formModel.autor" id="autor" type="text"
                    class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required />
            </div>
            <div class="flex flex-col">
                <label class="text-zinc-400 text-lg mb-1" for="paginas">Cantidad de paginas:</label>
                <input v-model="formModel.paginas" id="paginas" type="text"
                    class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required />
            </div>
            <button type="submit"
                class="w-full bg-emerald-600 hover:bg-emerald-900 text-white font-semibold py-3 rounded-lg transition-all">
                Agregar Libro
            </button>

            <p v-if="visualMesagge" class="text-emerald-400 text-center mt-4">
                {{ visualMesagge }}
            </p>
            <p v-if="storeBiblioteca.error" class="text-red-400 text-center mt-2">
                {{ storeBiblioteca.error }}
            </p>
        </form>
    </section>
</template>

<style scoped>

</style>