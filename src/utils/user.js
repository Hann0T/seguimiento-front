import { reactive } from "vue";

export let user = reactive({
  id: 0,
  dni: 0,
  correo: '',
  nombre_completo: '',
  telefono: 0,
  codigo_postal: 0,
  direccion: '',
  metodo_pago: '',
});
