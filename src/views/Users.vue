<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import md5 from "md5";
import useLocalStorage from '../utils/localStorage';
import { url } from '../utils/url';

const [usuario, saveUsuario] = useLocalStorage('USER', {});

const usuarios = ref([]);

onMounted(() => {
    if (!usuario.id) {
        window.location.href = "/login";
    }
    getUsuarios();
});

const getUsuarios = () => {
    axios.get(`${url}/usuarios`)
        .then(response => {
            usuarios.value = response.data;
            console.log(response.data)
        });
};

const gravatar = (usuario) => {
    // console.log("sdf" + usuario.correo);
    const hash = md5(usuario.correo?.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
};

const tableHeader = [
    "Foto",
    "ID",
    "Nombre",
    "DNI",
    "Direccion",
    "Telefono",
    "correo",
];
</script>

<template>
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
                            <tr v-for="usuario in usuarios" key="suscripcion.id">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.id }}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        <img class="h-8 w-8 rounded-full" :src="gravatar(usuario)" alt="usuario.id" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.nombre_completo }}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.dni }}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.direccion }}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.telefono }}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {{ usuario.correo }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
