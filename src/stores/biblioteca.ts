import type { Libro } from "@/interfaces/libros";
import { defineStore } from "pinia";

interface BibliotecaState {
    isLoading: boolean,
    data: Libro[],
    error: string | null
}

let autoIncrementalId:number=1

export const useBibliotecaStore = defineStore('biblioteca',{
    state: (): BibliotecaState => ({
        isLoading: true,
        data: [],
        error: null
    }),
    actions:{
        async fetchInitialData() {
            //Sin esta funcion, no se puede manejar el estado de 'isLoading'
            this.isLoading = true
            try {
                await new Promise((r) => setTimeout(r, 300))
                this.data = this.data
                this.error = null
            } catch (err) {
                this.error = 'Error al cargar los datos iniciales'
            } finally {
                this.isLoading = false
            }
        },
        addBook(book:Libro):void{
            const existe = this.data.some((b)=> b.titulo ===book.titulo)

            if(existe){
                this.error = "El libro ya existe dentro de la biblioteca"
                return
            }

            book.id = autoIncrementalId

            this.data.push(book)
            this.error = ""

            //Manejo y aumento del id
            
            autoIncrementalId++
        },
        changeDisponibilidad(id:number):void{
            const bookFound = this.data.find((b)=> b.id === id)
        }
    },
    getters:{
        sortAlphabetically:(state):Libro[]=>{
            return [...state.data].sort((a, b) => a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase()))
        },
        sortAlphabeticallyAuthor:(state):Libro[]=>{
            return [...state.data].sort((a, b) => a.autor.toLowerCase().localeCompare(b.autor.toLowerCase()))
        },
        sortByAPages:(state):Libro[]=>{
            return [...state.data].sort((a, b) => a.paginas - b.paginas)
        }
    }
})