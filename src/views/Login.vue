<template>
    <div class="vh-100">
        <div class="container-fluid h-custom"
            style="height: calc(100% - 73px); @media (max-width: 450px) {.h-custom {height: 100%;}}">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style="margin-top: 5%;">
                    <form>
                        <div class="input-group mb-4 mt-3">
                            <span class="input-group-text">DNI usuario:</span>
                            <input type="email" class="form-control form-control-md" placeholder="ingrese su dni..." />
                        </div>
                        <div class="input-group mb-3 mt-3">
                            <span class="input-group-text">Contraseña:</span>
                            <input type="password" class="form-control form-control-md"
                                placeholder="Ingrese su Contraseña..." />
                        </div>
                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="button" class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                            <p class="small fw-bold mt-2 pt-1" data-bs-target="#staticBackdrop" data-bs-toggle="modal">
                                No tienes una cuenta? <a href="#!" class="link-danger">Registrate</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Registro Usuario:</h5><br>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row g-3 modal-body">
                    <div class="col-md-5" style="margin-left: 4%;">
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
                    <div class="col-md-6">
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
