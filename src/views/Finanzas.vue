<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import useLocalStorage from '../utils/localStorage';
import { url } from '../utils/url';

const [usuario, saveUsuario] = useLocalStorage('USER', {});

const mesSelected = ref('A')

const meses = ref([
    { text: 'Enero', value: 1 },
    { text: 'Febrero', value: 2 },
    { text: 'Marzo', value: 3 },
    { text: 'Abril', value: 4 },
    { text: 'Mayo', value: 5 },
    { text: 'Junio', value: 6 },
    { text: 'Julio', value: 7 },
    { text: 'Agosto', value: 8 },
    { text: 'Septiembre', value: 9 },
    { text: 'Octubre', value: 10 },
    { text: 'Noviembre', value: 11 },
    { text: 'Diciembre', value: 12 },
]);

const suscripciones = ref([]);

const searchSuscripciones = () => {
    axios.get(`${url}/finanzas/${mesSelected.value}/${usuario.id}`)
        .then((response) => suscripciones.value = response.data);
};

onMounted(() => {
    if (!usuario.id || usuario.rol === 'admin') {
        window.location.href = "/login";
    }
});

const hasSuscripciones = computed(() => {
    return suscripciones.value.length > 0;
});

const fechaFacturacion = (suscripcion) => {
    return suscripcion.fechaInicio.slice('-2') + ' de cada mes';
};

const precio = (suscripcion) => {
    return suscripcion.tipoMoneda + suscripcion.proveedor.costo;
}

const pagarEnSoles = () => {
    let total = 0;
    suscripciones.value.forEach((sus) => {
        if (sus.tipoMoneda === 's/.') {
            total += sus.proveedor.costo;
        }
    });

    return total;
}

const pagarEnDolares = () => {
    let total = 0;
    suscripciones.value.forEach((sus) => {
        if (sus.tipoMoneda === '$') {
            total += sus.proveedor.costo;
        }
    });

    return total;
}

const pagarEnEuros = () => {
    let total = 0;
    suscripciones.value.forEach((sus) => {
        if (sus.tipoMoneda === '€') {
            total += sus.proveedor.costo;
        }
    });

    return total;
}

const printReport = () => {
    window.print();
}

const tableHeader = [
    "Proveedor",
    "soporte",
    "Fecha De Facturacion",
    "Duración",
    "Precio",
    "Ciclo",
];
</script>

<template>
    <div className='flex flex-col'>
        <div className='-my-2 sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div class="flex justify-between py-2">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="mes" class="block text-sm font-medium text-gray-700">
                            Mes:
                        </label>
                        <select id="mes" name="mes"
                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            v-model="mesSelected">
                            <option disabled value="">Selecciona uno</option>
                            <option v-for="mes in meses" :key="mes.value" :value="mes.value">{{ mes.text }}</option>
                        </select>
                    </div>
                    <div class="h-full">
                        <button v-if="hasSuscripciones" type="button"
                            className='bg-blue-400 hover:bg-blue-700 hover:shadow-lg text-white no-underline py-3 px-4 rounded mr-2'
                            @click="printReport">
                            Imprimir Reporte
                        </button>
                        <button type="button"
                            className='bg-blue-400 hover:bg-blue-700 hover:shadow-lg text-white no-underline py-3 px-4 rounded'
                            @click="searchSuscripciones">
                            Buscar
                        </button>

                    </div>
                </div>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                </div>
            </div>
        </div>
    </div>
    <div v-if="hasSuscripciones">
        <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="flex justify-end py-2"></div>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th v-for="header in tableHeader" scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ header }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr v-for="suscripcion in suscripciones" key="suscripcion.id">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ suscripcion.proveedor.nombre }}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ suscripcion.proveedor.correo }}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ fechaFacturacion(suscripcion) }}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ suscripcion.duracion }}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ precio(suscripcion) }}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {{ suscripcion.diasRecordatorio }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-5 flex flex-col items-end mr-5">
                        <p class="mr-24">
                            Total A Pagar:
                        </p>
                        <div>
                            <p><strong>s/.:</strong> {{ pagarEnSoles() }}</p>
                            <p><strong>$:</strong> {{ pagarEnDolares() }}</p>
                            <p><strong>€:</strong> {{ pagarEnEuros() }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="text-3xl text-center mt-5 font-bold text-indigo-700">
            No hay suscripciones
        </p>
    </div>
</template>
