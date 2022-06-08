<script setup>
import useLocalStorage from '../utils/localStorage';

const [usuario, saveUsuario] = useLocalStorage('USER', {});
</script>

<template>
    <div v-if="!usuario.id">
        <div
            class="flex flex-col gap-4 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 class="text-3xl text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span class="block">Listo Para empezar?</span>
                <span class="block text-indigo-600">A que esperas</span>
            </h2>
            <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div class="inline-flex rounded-md shadow">
                    <router-link to="/login"
                        class="inline-flex no-underline items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Iniciar sesion
                    </router-link>
                </div>
                <div class="ml-3 inline-flex rounded-md shadow">
                    <a href="#"
                        class="inline-flex no-underline items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                        Registrarse
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2 class="text-3xl text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span class="block">Bienvenido/a</span>
        </h2>
    </div>
</template>
