<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import useLocalStorage from '../utils/localStorage';
import { url } from '../utils/url';
import DialogModalError from '../components/DialogModalError.vue';

let [usuario, saveUsuario] = useLocalStorage('USER', {});

let register = reactive({
    dni: '',
    password: '',
    nombre_completo: '',
    correo: '',
    codigo_postal: '',
    direccion: '',
    metodo_pago: '',
    telefono: ''
});

const handleRegistro = () => {
    var data = new FormData();
    data.append('dni', register.dni);
    data.append('password', register.password);
    data.append('nombre_completo', register.nombre_completo);
    data.append('correo', register.correo);
    data.append('codigo_postal', register.codigo_postal);
    data.append('direccion', register.direccion);
    data.append('metodo_pago', register.metodo_pago);
    data.append('telefono', register.telefono);

    axios.post(`${url}/usuarios/registro`, data)
        .then(() => {
            window.location.href = '/login';
        }).catch(err => {
            errMessage.title = "Error al Registrarse";
            errMessage.message = err.message;
            openDialog();
        });
};

onMounted(() => {
    if (usuario.id) {
        return window.location.href = '/';
    }
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

function something(ev) {
    console.log(ev);
}

</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrarse</h2>
            </div>
            <div class="mt-8 space-y-6">
                <form @submit.prevent="handleRegistro">
                    <div class="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
                        <div>
                            <label for="dni" class="sr-only">Dni</label>
                            <input id="dni" name="dni" type="text" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Dni" v-model="register.dni" />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña" v-model="register.password" />
                        </div>
                        <div>
                            <label for="nombre_completo" class="sr-only">Nombre Completo</label>
                            <input id="nombre_completo" name="nombre_completo" type="text" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre Apellido" v-model="register.nombre_completo" />
                        </div>
                        <div>
                            <label for="correo" class="sr-only">Correo</label>
                            <input id="correo" name="correo" type="email" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="correo@ejemplo.com" v-model="register.correo" />
                        </div>
                        <div>
                            <label for="codigo_postal" class="sr-only">Código Postal</label>
                            <input id="codigo_postal" name="codigo_postal" type="number" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="código postal" v-model="register.codigo_postal" />
                        </div>
                        <div>
                            <label for="direccion" class="sr-only">Dirección</label>
                            <input id="direccion" name="direccion" type="text" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Dirección" v-model="register.direccion" />
                        </div>
                        <div>
                            <label for="metodo_pago" class="sr-only">Método Pago</label>
                            <select v-model="register.metodo_pago"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                <option disabled value="">Selecciona uno</option>
                                <option>Credito</option>
                                <option>Debito</option>
                                <option>Efectivo</option>
                            </select>
                        </div>
                        <div>
                            <label for="telefono" class="sr-only">Teléfono</label>
                            <input id="telefono" name="telefono" type="text" required="true"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="987654321" v-model="register.telefono" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true" />
                            </span>
                            Registro
                        </button>
                        <a href="/login" class="block text-center mt-2 text-indigo-700 no-underline hover:underline">
                            Volver
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <DialogModalError :isOpen="dialogIsOpen" @close="closeDialog" :title="errMessage.title"
        :message="errMessage.message" />
</template>
