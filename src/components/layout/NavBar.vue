<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import { computed, onMounted, reactive } from 'vue';
import md5 from "md5";
import useLocalStorage from '../../utils/localStorage';

const [usuario, saveUsuario] = useLocalStorage('USER', {});

const navigation = reactive([
    { name: 'Home', href: '/', current: true, show: true },
    { name: 'Proveedores', href: '/proveedores', current: false, show: true },
    { name: 'Suscripciones', href: '/suscripciones', current: false, show: true },
    { name: 'Usuarios', href: '/usuarios', current: false, show: true },
    { name: 'Finanzas', href: '/finanzas', current: false, show: true },
    { name: 'Informacion del usuario', href: '/user-info', current: false, show: true },
]);

const userNavigation = [
    { name: 'Your Profile', href: '/user-info' },
    { name: 'Sign out', href: '/login' },
];

const isShow = (item) => {
    if (item.name.toLowerCase() == 'suscripciones') {
        return usuario.rol === 'admin' ? false : true;
    }
    if (item.name.toLowerCase() == 'finanzas') {
        return usuario.rol === 'admin' ? false : true;
    }
    if (item.name.toLowerCase() == 'usuarios') {
        return usuario.rol === 'admin' ? true : false;
    }
    return true;
};

const handleNavCurrent = (item) => {
    navigation.forEach(item => item.current = false);
    item.current = true;
};

const gravatar = computed(() => {
    const hash = md5(usuario.correo.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
});
</script>

<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow" />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <div v-for="item in navigation" :key="item.name">
                                    <router-link v-if="isShow(item)" :to="item.href" class="no-underline hover:cursor"
                                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                                        :aria-current="item.current ? 'page' : undefined"
                                        @click="handleNavCurrent(item)">
                                        {{ item.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <!-- <button type="button"
                                 class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                 <span class="sr-only">View notifications</span>
                                 <BellIcon class="h-6 w-6" aria-hidden="true" />
                                 </button> -->

                            <!-- Profile dropdown -->
                            <Menu v-if="usuario.id" as="div" class="ml-3 relative">
                                <div>
                                    <MenuButton
                                        class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="gravatar" alt="usuario.id" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">

                                        <a :href="item.href" class="no-underline"
                                            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                            {{ item.name }}
                                        </a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">Open main menu</span>
                            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>
        </Disclosure>

        <!-- <header class="bg-white shadow">
             <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
             <h1 class="text-3xl font-bold text-gray-900">
             {{ getTitle }}
             </h1>
             </div>
             </header> -->
        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>
