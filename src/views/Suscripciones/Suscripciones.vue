<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import useLocalStorage from '../../utils/localStorage';
import { url } from '../../utils/url';


const [usuario, saveUsuario] = useLocalStorage('USER', {});

const suscripciones = ref([]);

const suscripcionDataForm = reactive({
    fechaInicio: '',
    duracion: '',
    ciclo: '',
    diasRecordatorio: '',
    tipoMoneda: '',
    Proveedor: '',
});

onMounted(() => {
    getSuscripciones();
});

const getSuscripciones = () => {
    axios.get(`${url}/suscripciones/${usuario.id}`)
        .then(response => suscripciones.value = response.data);
};

const handleRegistrarSuscripcion = () => {
    var data = new FormData();
    data.append('duracion', suscripcionDataForm.duracion);
    data.append('fechaInicio', suscripcionDataForm.fechaInicio);
    data.append('tipoMoneda', suscripcionDataForm.tipoMoneda);
    data.append('ciclo', suscripcionDataForm.ciclo);
    data.append('diasRecordatorio', suscripcionDataForm.diasRecordatorio);
    data.append('idProveedor', suscripcionDataForm.idProveedor);

    axios.post(`${url}/suscripciones/newsuscripcion`, data).then(() => {
        getSuscripciones();
    });
};

const handleDelete = (suscripcion) => {
    axios.post(`${url}/suscripciones/delete/${suscripcion.id}`)
        .then(() => getSuscripciones());
};

const tableHeader = [
    'ID',
    'Fecha Inicio',
    'Duración',
    'Ciclo de pago',
    'Dias Recordatorio',
    'Tipo Moneda',
    'Proveedor',
    'Eliminar',
];

</script>

<template>
    <div className='flex flex-col'>
        <div className='-my-2 sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div class="flex justify-end py-2">
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
                            <tr v-for="suscripcion in suscripciones" key="proveedor.idProveedor">
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.id }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.fechaInicio }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.duracion }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.ciclo }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.diasRecordatorio }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.tipoMoneda }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                        {{ suscripcion.proveedor.nombre }}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <button @click='handleDelete(suscripcion)'
                                        className='bg-red-400 hover:bg-red-700 hover:shadow-lg text-white no-underline py-2 px-4 rounded'>
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
</template>
