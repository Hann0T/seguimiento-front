<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

const url = 'https://88d3-38-25-15-22.sa.ngrok.io/proveedores';

const proveedores = ref([]);

const proveedorData = reactive({
    nombre: '',
    nombre_servicio: '',
    categoria: '',
    costo: 0,
    website: '',
    correo: '',
});

onMounted(() => {
    getProveedores();
});

const getProveedores = () => {
    axios.get(url)
        .then(response => proveedores.value = response.data);
};

const handleRegistrarProveedor = () => {
    axios.post(`${url}/newproveedor`, proveedorData).then(() => {
        console.log(proveedorData);
        getProveedores();
    });
};

const handleDelete = (proveedor) => {
    axios.post(`${url}/delete/${proveedor.id}`)
        .then(() => getProveedores());
};

const tableHeader = [
    'ID',
    'Nombre Proveedor',
    'Servicio',
    'Categoria',
    'Precio Mensual',
    'WebSite',
    'Correo',
    'eliminar',
    'editar'
];

</script>

<template>
    <div class="flex justify-end">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            AGREGAR PROVEEDOR
        </button>
    </div>
    <table class="table table-hover text-center">
        <thead>
            <tr>
                <th v-for="item in tableHeader" scope="col" :key="item">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="proveedor in proveedores">
                <th scope="row">{{ proveedor.id }}</th>
                <td>{{ proveedor.nombre }}</td>
                <td>{{ proveedor.nombre_servicio }}</td>
                <td>{{ proveedor.categoria }}</td>
                <td>{{ proveedor.costo }}</td>
                <td>{{ proveedor.website }}</td>
                <td>{{ proveedor.correo }}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger" @click="handleDelete(proveedor)">
                        delete
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
                    <h5 class="modal-title" id="staticBackdropLabel">Nuevo Proveedor:</h5><br>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row g-3 modal-body">
                    <div class="col-md-6" style="margin-left: 4%;">
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Nombre Proveedor:</span>
                            <input type="text" class="form-control" placeholder="Ingrese el nombre..." name="nombre"
                                v-model="proveedorData.nombre">
                        </div>
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Servicio:</span>
                            <input type="text" class="form-control" placeholder="Ingrese el servicio..."
                                name="nombre_servicio" v-model="proveedorData.nombre_servicio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Categoria:</span>
                            <input type="text" class="form-control" placeholder="Ingrese la categoria..."
                                name="categoria" v-model="proveedorData.categoria">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Precio Mensual:</span>
                            <input type="text" class="form-control" placeholder="Ingrese el precio..." name="costo"
                                v-model="proveedorData.costo">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">WebSite:</span>
                            <input type="text" class="form-control" placeholder="Ingrese el website..." name="website"
                                v-model="proveedorData.website">
                        </div>
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Correo Soporte:</span>
                            <input type="text" class="form-control" placeholder="Ingrese el correo..." name="correo"
                                v-model="proveedorData.correo">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" @click="handleRegistrarProveedor">Registrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
