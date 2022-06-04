<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Dni</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Telefono</th>
                <th scope="col">Dirección</th>
                <th scope="col">Codigo Postal</th>
                <th scope="col">Método de Pago</th>
                <th scope="col">Codigo Historial</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Editar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>74185296</td>
                <td>Alvarez</td>
                <td>alvarez1@hotmail.com</td>
                <td>987456123</td>
                <td>jr. Las Palmas 7453</td>
                <td>75642</td>
                <td>pago efectivo</td>
                <td>1</td>
                <td>
                    <button type="button" class="btn btn-outline-danger">
                        <span class="material-symbols-outlined">delete</span>
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
                    <h5 class="modal-title" id="staticBackdropLabel">Usuario Nuevo:</h5><br>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row g-3 modal-body">
                    <div class="col-md-6" style="margin-left: 4%;">
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">DNI:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su DNI...">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Apellido:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su apellido...">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Correo:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su correo...">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Telefono:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su telefono...">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Dirección:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su dirección...">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Código Postal:</span>
                            <input type="text" class="form-control" placeholder="Ingrese su código postal...">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Método de Pago:</span>
                            <select class="form-select w-1 p-1">
                                <option selected>Método de pago...</option>
                                <option value="1">Pago Efectivo</option>
                                <option value="2">Tarjeta Débito</option>
                                <option value="3">Tarjeta Crédito</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success">Registrar -></button>
                </div>
            </div>
        </div>
    </div>
</template>
