Equipark GPS Web
Frontend de la solución comercial B2C de Equipark GPS para la adquisición de servicios de localización GPS para vehículos.

Estado: En construcción
Versión: 0.1
Frontend: Angular + Tailwind CSS
Marca: Equipark GPS
Repositorio: equipark-gps-web
1. Objetivo
Permitir que el cliente conozca, seleccione y adquiera una solución GPS para su vehículo con el menor número posible de pasos.

Flujo principal:
Landing
  ↓
Seleccionar OBD / AVL
  ↓
Ingresar placa
  ↓
Consultar información del vehículo
  ↓
Confirmar / completar datos
  ↓
Datos del cliente
  ↓
Autorizaciones
  ↓
Pago
  ↓
Punto de instalación
  ↓
Fecha y hora
  ↓
Confirmación
2. Soluciones
OBD
Solución GPS con instalación Plug & Play.
- Rastreo GPS.
- Instalación Plug & Play.
- Instalación en menos de 30 minutos.
- Gestión mediante plataforma.
- Aplicación móvil.
Dispositivo: Linkworld OBD.
AVL
Solución GPS con instalación especializada.
- Rastreo GPS.
- Instalación especializada.
- Mayor nivel de control.
- Funcionalidades adicionales según compatibilidad del vehículo.
- Monitoreo 24/7 por Seguridad de Colombia.
Dispositivo: Suntech 8310UM.
Las funcionalidades adicionales del AVL dependen de las características y arquitectura electrónica del vehículo.

3. Consulta por placa
La aplicación deberá aprovechar la base de datos existente de vehículos para evitar digitación innecesaria.
PLACA
  ↓
Consulta DB / API
  ↓
¿Encontrado?
 ├─ Sí → Mostrar datos → Confirmar
 └─ No → Solicitar datos → Continuar
Información prevista:
- Placa.
- VIN / chasis.
- Marca.
- Modelo / línea.
- Año.
- Tipo de vehículo.
- Combustible / tecnología.
- Estado de garantía.
- Tipo de encendido.
- Solución seleccionada.
La integración real con la DB/API queda pendiente.
4. Autorizaciones
El flujo contempla checkbox para:
☐ Mi vehículo se encuentra actualmente en garantía.

☐ Autorizo a Equipark para instalar el dispositivo GPS
seleccionado en mi vehículo.

☐ Autorizo el tratamiento de mis datos personales para
gestionar la compra, instalación y prestación del servicio.
5. Datos del cliente
- Nombre.
- Apellido.
- Cédula.
- Teléfono.
- Correo.
- Departamento.
- Ciudad.
- Dirección.
- PIN de cuatro dígitos.
6. Pago
Inicialmente se simularán:
- PSE.
- Tarjeta.
La pasarela real será proporcionada posteriormente por Equipark.

La implementación deberá abstraerse mediante un PaymentService para permitir reemplazar la simulación por la pasarela real.
7. Instalación
El cliente seleccionará:
- Punto de instalación.
- Fecha.
- Hora.
Reglas actuales:
- Mínimo un día de anticipación.
- OBD: menos de 30 minutos.
- AVL: aproximadamente 2 horas.
- Disponibilidad de instalación 24/7.
8. Diseño y UX
La primera versión utilizará exclusivamente la identidad de Equipark.

Principios:
- Menos clics.
- Diseño B2C.
- Experiencia clara.
- Responsive.
- Mobile-first cuando aplique.
- Cards y CTA claros.
- Validaciones visibles.
- Evitar formularios innecesariamente extensos.
La interfaz deberá funcionar correctamente en:
- Desktop.
- Tablet.
- Mobile.
9. Estilos
Se utilizará Tailwind CSS.

La arquitectura visual debe permitir modificar la apariencia desde una ubicación centralizada, siguiendo el enfoque utilizado anteriormente en StayEasy.

Se deben centralizar:
- Colores.
- Tipografía.
- Botones.
- Cards.
- Formularios.
- Badges.
- Espaciados.
- Componentes.
Esto permitirá posteriormente adaptar el branding sin reconstruir la aplicación.
10. Arquitectura objetivo
src/app/

├── core/
│   ├── models/
│   └── services/
│
├── shared/
│   └── components/
│
├── pages/
│   └── home/
│
└── features/
    ├── vehicle/
    ├── checkout/
    ├── payment/
    └── installation/
Servicios previstos
VehicleService
consultarPorPlaca()
PurchaseService
Gestiona el proceso de compra.

PaymentService
Gestionará posteriormente la pasarela de pagos.

InstallationService
Gestionará puntos, disponibilidad, fecha, hora y reserva.
11. Inteligencia artificial
La IA se considera una posibilidad futura para recomendar OBD o AVL.

No forma parte de la primera versión.

Modelo futuro:
Marca
Modelo
Año
Combustible
Tecnología
Garantía
Arquitectura
Funcionalidades
      ↓
Motor de reglas / IA
      ↓
Recomendación OBD / AVL
La primera versión deberá utilizar reglas de negocio controladas.
12. Alcance
Completado
- [x] Repositorio Git.
- [x] Proyecto Angular.
- [x] Landing inicial.
- [x] Selección OBD / AVL.
- [x] Cards de productos.
- [x] Consulta simulada por placa.
- [x] Datos del vehículo.
- [x] Datos del cliente.
- [x] Autorizaciones.
- [x] Pago simulado.
- [x] Selección de instalación.
- [x] Fecha y hora.
- [x] Confirmación.
- [x] Tailwind CSS.
- [x] Responsive.
- [x] Branding Equipark.
En construcción
- [ ] Refactorización de Home.
- [ ] Componentización definitiva.
- [ ] Modelos TypeScript.
- [ ] Services.
- [ ] Centralización de estilos.
- [ ] Validaciones definitivas.
Pendiente
- [ ] API / DB real de vehículos.
- [ ] Reglas definitivas de compatibilidad.
- [ ] Pasarela de pagos.
- [ ] Disponibilidad real de parqueaderos.
- [ ] Agenda real.
- [ ] Integración con instalación.
- [ ] Backend.
- [ ] Seguridad.
- [ ] Términos y condiciones.
- [ ] Política de tratamiento de datos.
- [ ] Pruebas funcionales.
- [ ] Pruebas responsive.
- [ ] Despliegue productivo.
- [ ] Evaluación de IA.
13. Principios técnicos
1. Solo OBD y AVL.
2. Menor cantidad posible de clics.
3. Consulta de información por placa.
4. Angular + Tailwind CSS.
5. Responsive desde el inicio.
6. Equipark como branding inicial.
7. Separación entre presentación, lógica y servicios.
8. Código preparado para futuras integraciones.
9. No comprometer funcionalidades que dependan de la compatibilidad del vehículo.
10. Mantener una experiencia comercial clara y transparente.
14. Estado
🟡 EN CONSTRUCCIÓN

Próximo bloque:
Arquitectura
   ↓
Separar Home
   ↓
Models
   ↓
Services
   ↓
Estilos centralizados
   ↓
Componentes
   ↓
Validación del flujo
   ↓
Preparación de API
15. Base técnica
La definición de las soluciones y la necesidad de validar técnicamente el vehículo antes de asignar funcionalidades se apoya en el piloto técnico realizado para Equipark, que validó soluciones AVL y OBD y documentó la importancia de considerar las características particulares del vehículo.