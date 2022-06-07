<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { url } from '../../utils/url';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
} from '@headlessui/vue'

import NewProveedorFormVue from './components/NewProveedorForm.vue';

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
const proveedores = ref([]);

const tableHeader = [
    'ID',
    'Nombre Proveedor',
    'Servicio',
    'Categoria',
    'Precio Mensual',
    'WebSite',
    'Correo',
    'Suscribirse',
    'Eliminar',
];

onMounted(() => {
    getProveedores();
});

const getProveedores = () => {
    axios.get(`${url}/proveedores`)
        .then(response => proveedores.value = response.data);
};


const handleDelete = (proveedor) => {
    axios.post(`${url}/proveedores/delete/${proveedor.id}`)
        .then(() => getProveedores());
};
</script>

<template>
    <div className='flex flex-col'>
        <div className='-my-2 sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div class="flex justify-end py-2">
                    <button type="button" @click="openModal"
                        className='bg-blue-400 hover:bg-blue-700 hover:shadow-lg text-white no-underline py-2 px-4 rounded'>
                        Agregar Proveedor
                    </button>
                </div>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th v-for="header in tableHeader" scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            <tr v-for="proveedor in proveedores" key="proveedor.idProveedor">
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.id }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.nombre }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.nombre_servicio }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.categoria }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.costo }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.website }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ proveedor.correo }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <button href='#asdf'
                                        className='bg-orange-400 hover:bg-orange-700 hover:shadow-lg text-white no-underline py-2 px-2 rounded'>
                                        Suscribirse
                                    </button>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <button @click='handleDelete(proveedor)'
                                        className='bg-red-400 hover:bg-red-700 hover:shadow-lg text-white no-underline py-2 px-2 rounded'>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    <NewProveedorFormVue @close="closeModal" @refresh="getProveedores" />
                                </p>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
