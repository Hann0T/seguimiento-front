<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { url } from '../../../utils/url';

const emit = defineEmits(['close', 'refresh'])

const proveedorDataForm = reactive({
    nombre: '',
    nombre_servicio: '',
    categoria: '',
    costo: 0,
    website: '',
    correo: '',
});

const handleRegistrarProveedor = () => {
    var data = new FormData();
    data.append('nombre', proveedorDataForm.nombre);
    data.append('nombre_servicio', proveedorDataForm.nombre_servicio);
    data.append('categoria', proveedorDataForm.categoria);
    data.append('costo', proveedorDataForm.costo);
    data.append('website', proveedorDataForm.website);
    data.append('correo', proveedorDataForm.correo);

    axios.post(`${url}/proveedores/newproveedor`, data)
        .then((response) => {
            emit('refresh');
            emit('close');
        });
};
</script>

<template>
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Crear nuevo proveedor</h3>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="nombre" class="block text-sm font-medium text-gray-700">
                                    Nombre</label>
                                <input type="text" name="nombre" id="nombre"
                                    class="mt-1 py-2 pl-2 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    v-model="proveedorDataForm.nombre" />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="nombre_servicio" class="block text-sm font-medium text-gray-700">
                                    Nombre del Servicio</label>
                                <input type="text" name="nombre_servicio" id="nombre_servicio"
                                    class="mt-1 py-2 pl-2 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    v-model="proveedorDataForm.nombre_servicio" />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="categoria" class="block text-sm font-medium text-gray-700">
                                    Categoria
                                </label>
                                <select id="categoria" name="categoria"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    v-model="proveedorDataForm.categoria">
                                    <option disabled value="">Selecciona uno</option>
                                    <option>Entretenimiento</option>
                                    <option>Productividad</option>
                                    <option>Mexico</option>
                                </select>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="website" class="block text-sm font-medium text-gray-700">
                                    Website
                                </label>
                                <div class="mt-1 flex rounded-md border shadow-sm">
                                    <span
                                        class="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        http:// </span>
                                    <input type="text" name="website" id="website"
                                        class="focus:ring-indigo-500 pl-2 focus:border-indigo-500 border flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        placeholder="www.example.com" v-model="proveedorDataForm.website" />
                                </div>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="costo" class="block text-sm font-medium text-gray-700">
                                    Costo
                                </label>
                                <input type="number" name="costo" id="costo"
                                    class="focus:ring-indigo-500 py-2 pl-2 focus:border-indigo-500 border flex-1 block w-full rounded sm:text-sm border-gray-300"
                                    v-model="proveedorDataForm.costo" />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="correo" class="block text-sm font-medium text-gray-700">
                                    Correo
                                </label>
                                <input type="email" name="correo" id="correo"
                                    class="focus:ring-indigo-500 py-2 pl-2 focus:border-indigo-500 border flex-1 block w-full rounded sm:text-sm border-gray-300"
                                    placeholder="example@email.com" v-model="proveedorDataForm.correo" />
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
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                @click="handleRegistrarProveedor">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
