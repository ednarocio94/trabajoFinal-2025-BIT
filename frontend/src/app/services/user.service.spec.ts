// 1. Realizar las importaciones necesarias 
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// importar el proveedor para hacer peticiones HTTP
import { provideHttpClient } from "@angular/common/http";
// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACIONES CON MIS PETICIONES HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuariosService } from "./user.service";
// 2. 
describe(' probando el servicio login', () => {
  let Service: UsuariosService;
  let httpMock: HttpTestingController;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let apiUrl = "http://localhost:3000/loginUser";
  let apiUrl2 = 'http://localhost:3000/loginAdmin';
  const emailTest = "Anastasia@gmail.com";
  const passwordTest = "123";
  const tokenTest = "kfldshf8ewr83dh";

  beforeEach(() => {
    mockToastrService = jasmine.createSpyObj("ToastrService",["info"]);
    mockRouter = jasmine.createSpyObj("Router",["navigate"]);
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
      
       {provide: ToastrService, useValue: mockToastrService},
       {provide: Router, useValue:mockRouter}
      ]

    });
    Service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // 
  });

  afterAll(() => {
    httpMock.verify(); //después de TODAS las pruebas, no queden peticiones pendientes
  });

// caso de prueba 1
// Caso de prueba para la función postUsuarios
it('debería realizar una solicitud POST para crear un usuario', () => {
  const mockUser: userService = { id: '1', name: 'Carlos', email: 'carlos@example.com' }; // Datos del usuario de prueba
  const mockResponse = { success: true, message: 'Usuario creado correctamente' }; // Respuesta esperada del backend

  // Llamar al método postUsuarios
  UsuariosService.postUsuarios(mockUser).subscribe(response => {
    // Verificar que la respuesta sea la esperada
    expect(response).toEqual(mockResponse);
  });

  // Esperar una solicitud POST a la URL esperada
  const req = httpMock.expectOne('http://localhost:3000/usuarios/crear'); // Verificar que la URL de la solicitud es correcta
  expect(req.request.method).toBe('POST'); // Asegurarnos de que la solicitud sea un POST
  expect(req.request.body).toEqual(mockUser); // Verificar que el cuerpo de la solicitud sea el usuario esperado

  // Simular la respuesta del servidor
  req.flush(mockResponse); // Simulamos la respuesta exitosa del servidor
});
});








  

