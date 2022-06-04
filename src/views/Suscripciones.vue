<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

const url = 'https://1a10-38-25-15-22.sa.ngrok.io';

const suscripciones = ref([]);

const suscripcionData = reactive({
    fechaInicio: '',
    duracion: '',
    cicloPago: '',
    fechaRecordatorio: '',
    tipoMoneda: '',
    idProveedor: '',
});

onMounted(() => {
    getSuscripciones();
});

const getSuscripciones = () => {
    axios.get(`${url}/suscripciones`)
        .then(response => suscripciones.value = response.data);
};

const handleRegistrarSuscripcion = () => {
    axios.post(`${url}/suscripciones/newsuscripcion`, proveedorData).then(() => {
        getProveedores();
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
    'Fecha Recordatorio',
    'Tipo Moneda',
    'ID Proveedor',
];

</script>

<template>
    <div class="flex justify-end">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">AGREGAR
            SUSCRIPCIÓN
        </button>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-for="item in tableHeader" scope="col">{{ item }}</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Editar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="suscripcion in suscripciones">
                <th scope="row">{{ suscripcion.id }}</th>
                <td>{{ suscripcion.fechaInicio }}</td>
                <td>{{ suscripcion.duracion }}</td>
                <td>{{ suscripcion.ciclo }}</td>
                <td>{{ suscripcion.diasRecordatorio }}</td>
                <td>{{ suscripcion.tipoMoneda }}</td>
                <td>{{ suscripcion.idProveedor }}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger">
                        <span class="material-symbols-outlined" @click="handleDelete(suscripcion)">delete</span>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-warning">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Nueva Suscripción:</h5><br>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row g-3 modal-body">
                    <div class="col-md-6" style="margin-left: 4%;">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Duración:</span>
                            <select v-model="suscripcionData.duracion" class="form-select w-1 p-1">
                                <option disabled value="">Elegir por meses...</option>
                                <option>1 mes</option>
                                <option>2 meses</option>
                                <option>3 meses</option>
                                <option>4 meses</option>
                                <option>5 meses</option>
                                <option>6 meses</option>
                                <option>7 meses</option>
                                <option>8 meses</option>
                                <option>9 meses</option>
                                <option>10 meses</option>
                                <option>11 meses</option>
                                <option>12 meses</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Ciclo de pago:</span>
                            <select class="form-select w-1 p-1">
                                <option selected>Elegir ciclo de pago...</option>
                                <option value="1">Semanal</option>
                                <option value="2">Quincenal</option>
                                <option value="2">Mensual</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Tipo Moneda:</span>
                            <select v-model="suscripcionData.tipoMoneda" class="form-select w-1 p-1">
                                <option disabled value="">Please select one</option>
                                <option>Soles (S/.)</option>
                                <option>Dolares ($)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" @click="handleRegistrarSuscripcion">Registrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
