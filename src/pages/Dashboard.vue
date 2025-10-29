<script setup lang="ts">
import { ref, type Ref  } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeRef = ref(route)

interface Section {
    name: string,
    route: string,
    isActive: boolean
}

const sections: Ref<Section[]> = ref<Section[]>([
    { name: 'Formulario', route: '/form', isActive: false },
    { name: 'Lista', route: '/list', isActive: false }
]);

//Cambia estado de 'isActive para manejar estados'
const changeActive = (name:string):void =>{
    sections.value.forEach((ruta) => {
        if (name === ruta.name) {
            ruta.isActive = true
            console.log("caso true")
        }else{
            ruta.isActive = false
            console.log("caso false")
        }
    })
}

</script>

<template>
    <div class="min-h-screen flex bg-zinc-900 text-zinc-200 font-sans">
        <aside class="w-64 border-r border-zinc-700/60 bg-zinc-950 p-4">
            <nav class="flex-1 px-3 py-4 space-y-1">
                <!-- Por cada section declarado dentro de 'sections', se crea una ruta que puede estar o no estar activa  -->
                <RouterLink v-for="(section, index) in sections" :key="index" :to="section.route" class="flex items-center px-4 py-2.5 rounded-lg border border-transparent text-sm font-medium transition-colors duration-200
                    hover:bg-cyan-950 hover:border-cyan-700 hover:text-zinc-950"
                    :class="{ 'bg-cyan-600 border-zinc-700 ': section.isActive }" @click="changeActive(section.name)">
                    <span :class="!section.isActive ? 'ml-1 text-white' : 'ml-1 text-zinc-900'" >{{ section.name }}</span>
                </RouterLink>
            </nav>
        </aside>

        <main class="flex-1 flex flex-col">
            <header class="h-16 border-b border-zinc-800 border-2 rounded-sm bg-cyan-900 text-zinc-100 flex items-center justify-between px-6">
                <h1 class="text-2xl font-semibold tracking-wide">Biblioteca</h1>
            </header>

            <!-- Muestra el contenido segun la ruta seleccionada -->
            <section class="flex-1 p-6 overflow-y-auto bg-cyan-900 border-2 border-cyan-950 rounded-sm">
                <RouterView />
            </section>
        </main>
    </div>
</template>

<style scoped>

</style>