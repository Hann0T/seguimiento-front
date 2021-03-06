<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { url } from '../../../utils/url';
import useLocalStorage from '../../../utils/localStorage';
import DialogModalError from '../../../components/DialogModalError.vue';

const [usuario, saveUsuario] = useLocalStorage('USER', {});

const props = defineProps(['idProveedor']);
const emit = defineEmits(['close']);

const suscripcionDataForm = reactive({
    fechaInicio: '',
    duracion: '',
    ciclo: '',
    diasRecordatorio: '',
    tipoMoneda: '',
    idProveedor: '',
});

const monedaSelected = ref('');

const monedas = ref([
    { text: 'Soles', value: 's/.' },
    { text: 'Dolares', value: '$' },
    { text: 'Euros', value: '€' },
]);

const handleRegistrarSuscripcion = () => {
    var data = new FormData();
    data.append('duracion', suscripcionDataForm.duracion);
    data.append('fechaInicio', suscripcionDataForm.fechaInicio);
    data.append('tipoMoneda', monedaSelected.value);
    data.append('ciclo', suscripcionDataForm.ciclo);
    data.append('diasRecordatorio', suscripcionDataForm.diasRecordatorio);
    data.append('mes', getMes(suscripcionDataForm.fechaInicio));
    data.append('proveedor', props.idProveedor);
    data.append('usuario', usuario.id);

    axios.post(`${url}/suscripciones/newsuscripcion`, data).then(() => {
        emit('close');
    }).catch(err => {
        errMessage.title = "Error al registrar nueva suscripcion";
        errMessage.message = err.message;
        openDialog();
    });
};

const getMes = (fecha) => {
    let date = new Date(fecha);
    return date.getMonth() + 1;
};

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
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Suscribirse
                    </h3>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form @submit.prevent="handleRegistrarSuscripcion">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="fechaInicio" class="block text-sm font-medium text-gray-700">
                                        Fecha de Inicio</label>
                                    <input type="date" name="fechaInicio" id="fechaInicio"
                                        class="mt-1 py-2 pl-2 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        v-model="suscripcionDataForm.fechaInicio" required />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="duracion" class="block text-sm font-medium text-gray-700">
                                        Duracion de la Suscripcion</label>
                                    <select id="duracion" name="duracion"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        v-model="suscripcionDataForm.duracion" required>
                                        <option disabled value="">Selecciona uno</option>
                                        <option>1 mes</option>
                                        <option>3 meses</option>
                                        <option>6 meses</option>
                                        <option>12 meses</option>
                                        <option>18 meses</option>
                                        <option>24 meses</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="ciclo" class="block text-sm font-medium text-gray-700">
                                        Ciclo de pago
                                    </label>
                                    <select id="ciclo" name="ciclo"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        v-model="suscripcionDataForm.ciclo" required>
                                        <option disabled value="">Selecciona uno</option>
                                        <option>Semanal</option>
                                        <option>Mensual</option>
                                        <option>Anual</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="diasRecordatorio" class="block text-sm font-medium text-gray-700">
                                        Dias Recordatorio
                                    </label>
                                    <select id="diasRecordatorio" name="diasRecordatorio"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        v-model="suscripcionDataForm.diasRecordatorio" required>
                                        <option disabled value="">Selecciona uno</option>
                                        <option>5 dias</option>
                                        <option>10 dias</option>
                                        <option>20 dias</option>
                                        <option>30 dias</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="tipoMoneda" class="block text-sm font-medium text-gray-700">
                                        Tipo Moneda
                                    </label>
                                    <select id="tipoMoneda" name="tipoMoneda"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        v-model="monedaSelected" required>
                                        <option disabled value="">Selecciona uno</option>
                                        <option v-for="moneda in monedas" :key="moneda.value" :value="moneda.value">
                                            {{ moneda.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end w-full bg-gray-50">
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="$emit('close')">cancel</button>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <DialogModalError :isOpen="dialogIsOpen" @close="closeDialog" :title="errMessage.title"
        :message="errMessage.message" />
</template>
