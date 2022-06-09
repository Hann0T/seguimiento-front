<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import useLocalStorage from '../utils/localStorage';
import { url } from '../utils/url';
import DialogModalError from '../components/DialogModalError.vue';

let [item, saveItem] = useLocalStorage('USER', {});

let login = reactive({
    dni: '',
    password: ''
});

const handleLogin = () => {
    var data = new FormData();
    data.append('dni', login.dni);
    data.append('password', login.password);

    axios.post(`${url}/login`, data)
        .then((response) => {
            saveItem(response.data);
            window.location.href = '/';
        }).catch(err => {
            errMessage.title = "Error al Logearse";
            errMessage.message = err.message;
            openDialog();
        });
};

onMounted(() => {
    saveItem({});
});

let errMessage = reactive({
    title: '',
    message: ''
});

const dialogIsOpen = ref(false);

const openDialog = () => {
    dialogIsOpen.value = true;
};

const closeDialog = () => {
    dialogIsOpen.value = false;
};

</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="mt-8 space-y-6">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="dni" class="sr-only">Dni</label>
                            <input id="dni" name="dni" type="text" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Dni" v-model="login.dni" />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña" v-model="login.password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true" />
                            </span>
                            Iniciar sesión
                        </button>
                        <div class="w-full flex justify-center mt-2">
                            <a href="/registro"
                                class="text-indigo-700 no-underline text-center hover:underline cursor">o
                                registrate</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <DialogModalError :isOpen="dialogIsOpen" @close="closeDialog" :title="errMessage.title"
        :message="errMessage.message" />
</template>
