<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { url } from '../../utils/url';
import NewProveedorFormVue from './components/NewProveedorForm.vue';
import NewSuscripcionFormVue from '../Suscripciones/components/NewSuscripcionForm.vue';
import useLocalStorage from '../../utils/localStorage';
import DialogModal from '../../components/DialogModal.vue';
import ModalForm from '../../components/ModalForm.vue';

const [usuario, saveUsuario] = useLocalStorage('USER', {});

const idProveedor = ref(0);

const isOpenProveedor = ref(false);

function closeModalProveedor() {
    isOpenProveedor.value = false;
}

function openModalProveedor() {
    isOpenProveedor.value = true;
}

const isOpenSuscripcion = ref(false);

function closeModalSuscripcion() {
    isOpenSuscripcion.value = false;
}

function openModalSuscripcion(id) {
    idProveedor.value = id;
    isOpenSuscripcion.value = true;
}

const dialogIsOpen = ref(false);

const openDialog = (id) => {
    idProveedor.value = id;
    dialogIsOpen.value = true;
};

const closeDialog = () => {
    dialogIsOpen.value = false;
};

const proveedores = ref([]);

const tableHeader = [
    'ID',
    'Nombre Proveedor',
    'Servicio',
    'Categoria',
    'Precio Mensual',
    'Correo',
    'Suscribirse',
];

onMounted(() => {
    if (!usuario.id) {
        window.location.href = "/login";
    }
    getProveedores();
});

const getProveedores = () => {
    axios.get(`${url}/proveedores`)
        .then(response => proveedores.value = response.data);
};


const handleDelete = (id) => {
    axios.post(`${url}/proveedores/delete/${id}`)
        .then(() => getProveedores());
};
</script>

<template>
    <div className='flex flex-col'>
        <div className='-my-2 sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div class="flex justify-end py-2" v-if="usuario.rol === 'admin'">
                    <button type="button" @click="openModalProveedor"
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
                                <th v-if="usuario.rol === 'admin'" scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Eliminar
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
                                        <a :href="'https://' + proveedor.website" target="_blank"
                                            class="text-indigo-700 no-underline font-bold">
                                            {{ proveedor.nombre }}
                                        </a>
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
                                        {{ proveedor.correo }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <button @click="openModalSuscripcion(proveedor.id)"
                                        className='bg-orange-400 hover:bg-orange-700 hover:shadow-lg text-white no-underline py-2 px-2 rounded'>
                                        Suscribirse
                                    </button>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'
                                    v-if="usuario.rol === 'admin'">
                                    <button @click="openDialog(proveedor.id)"
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

    <ModalForm :isOpen="isOpenProveedor" @close="closeModalProveedor">
        <NewProveedorFormVue @close="closeModalProveedor" @refresh="getProveedores" />
    </ModalForm>

    <ModalForm :isOpen="isOpenSuscripcion" @close="closeModalSuscripcion">
        <NewSuscripcionFormVue @close="closeModalSuscripcion" :idProveedor="idProveedor" />
    </ModalForm>

    <DialogModal :isOpen="dialogIsOpen" @close="closeDialog" @accept="handleDelete" :idProveedor="idProveedor" />
</template>
