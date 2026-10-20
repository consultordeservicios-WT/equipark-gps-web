import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Vehiculo {
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  combustible: string;
  tipo: string;
}

interface Parqueadero {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  paso = 1;

  planSeleccionado: 'OBD' | 'AVL' | null = null;

  placa = '';

  vehiculo: Vehiculo | null = null;

  consultando = false;

  consultaRealizada = false;

  mensajeConsulta = '';

  datosUsuario = {
    nombre: '',
    apellido: '',
    cedula: '',
    departamento: 'Antioquia',
    ciudad: 'Medellín',
    direccion: '',
    telefono: '',
    correo: '',
    pin: '',
    confirmarPin: ''
  };

  garantia = false;

  autorizacionDispositivo = false;

  tratamientoDatos = false;

  ofertas = false;

  metodoPago: 'PSE' | 'TARJETA' | null = null;

  parqueaderos: Parqueadero[] = [
    {
      id: 1,
      nombre: 'Equipark Medellín',
      ciudad: 'Medellín',
      direccion: 'Punto de instalación Medellín'
    },
    {
      id: 2,
      nombre: 'Equipark Bogotá',
      ciudad: 'Bogotá',
      direccion: 'Punto de instalación Bogotá'
    },
    {
      id: 3,
      nombre: 'Equipark Cali',
      ciudad: 'Cali',
      direccion: 'Punto de instalación Cali'
    }
  ];

  parqueaderoSeleccionado: Parqueadero | null = null;

  fechaInstalacion = '';

  horaInstalacion = '';

  solicitudRegistrada = false;

  seleccionarPlan(plan: 'OBD' | 'AVL'): void {
    this.planSeleccionado = plan;
    this.paso = 2;

    setTimeout(() => {
      document
        .getElementById('proceso')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  consultarPlaca(): void {

    if (!this.placa.trim()) {
      this.mensajeConsulta = 'Ingresa una placa para continuar.';
      return;
    }

    this.consultando = true;
    this.consultaRealizada = false;
    this.mensajeConsulta = '';

    setTimeout(() => {

      const placaNormalizada =
        this.placa.toUpperCase().replace(/\s/g, '');

      /*
       * SIMULACIÓN DE CONSULTA A BD
       * Posteriormente será reemplazada por API.
       */

      const vehiculos: Vehiculo[] = [
        {
          placa: 'ABC123',
          marca: 'Renault',
          modelo: 'Logan',
          anio: 2022,
          combustible: 'Gasolina',
          tipo: 'Automóvil'
        },
        {
          placa: 'XYZ789',
          marca: 'Toyota',
          modelo: 'Corolla',
          anio: 2023,
          combustible: 'Gasolina',
          tipo: 'Automóvil'
        },
        {
          placa: 'DEF456',
          marca: 'Chevrolet',
          modelo: 'Tracker',
          anio: 2021,
          combustible: 'Gasolina',
          tipo: 'SUV'
        }
      ];

      const encontrado = vehiculos.find(
        vehiculo => vehiculo.placa === placaNormalizada
      );

      if (encontrado) {

        this.vehiculo = encontrado;

        this.placa = encontrado.placa;

        this.consultaRealizada = true;

        this.mensajeConsulta =
          'Encontramos información de tu vehículo.';

      } else {

        this.vehiculo = {
          placa: placaNormalizada,
          marca: '',
          modelo: '',
          anio: new Date().getFullYear(),
          combustible: '',
          tipo: ''
        };

        this.consultaRealizada = true;

        this.mensajeConsulta =
          'No encontramos información. Puedes completar los datos manualmente.';
      }

      this.consultando = false;

    }, 700);
  }

  continuarDatos(): void {

    if (!this.placa.trim()) {
      return;
    }

    if (!this.autorizacionDispositivo) {
      return;
    }

    if (!this.tratamientoDatos) {
      return;
    }

    this.paso = 3;

    this.scrollProceso();
  }

  continuarPago(): void {

    if (
      !this.datosUsuario.nombre ||
      !this.datosUsuario.apellido ||
      !this.datosUsuario.cedula ||
      !this.datosUsuario.telefono ||
      !this.datosUsuario.correo ||
      !this.datosUsuario.pin ||
      !this.datosUsuario.confirmarPin
    ) {
      return;
    }

    if (
      this.datosUsuario.pin !==
      this.datosUsuario.confirmarPin
    ) {
      alert('Los PIN no coinciden.');
      return;
    }

    if (this.datosUsuario.pin.length !== 4) {
      alert('El PIN debe tener 4 dígitos.');
      return;
    }

    this.paso = 4;

    this.scrollProceso();
  }

  seleccionarPago(
    metodo: 'PSE' | 'TARJETA'
  ): void {

    this.metodoPago = metodo;
  }

  continuarAgenda(): void {

    if (!this.metodoPago) {
      return;
    }

    this.paso = 5;

    this.scrollProceso();
  }

  seleccionarParqueadero(
    parqueadero: Parqueadero
  ): void {

    this.parqueaderoSeleccionado = parqueadero;
  }

  reservarInstalacion(): void {

    if (
      !this.parqueaderoSeleccionado ||
      !this.fechaInstalacion
    ) {
      return;
    }

    const fechaSeleccionada =
      new Date(this.fechaInstalacion + 'T00:00:00');

    const minimo =
      new Date();

    minimo.setDate(minimo.getDate() + 1);

    if (fechaSeleccionada < minimo) {

      alert(
        'La instalación debe reservarse con mínimo un día de anticipación.'
      );

      return;
    }

    this.solicitudRegistrada = true;

    this.guardarSolicitud();

    this.paso = 6;

    this.scrollProceso();
  }

  guardarSolicitud(): void {

    const solicitud = {
      plan: this.planSeleccionado,
      vehiculo: this.vehiculo,
      placa: this.placa,
      usuario: this.datosUsuario,
      garantia: this.garantia,
      autorizacionDispositivo: this.autorizacionDispositivo,
      metodoPago: this.metodoPago,
      parqueadero: this.parqueaderoSeleccionado,
      fechaInstalacion: this.fechaInstalacion,
      horaInstalacion: this.horaInstalacion,
      fechaRegistro: new Date().toISOString()
    };

    localStorage.setItem(
      'equipark_solicitud',
      JSON.stringify(solicitud)
    );
  }

  volver(): void {

    if (this.paso > 1) {
      this.paso--;
      this.scrollProceso();
    }
  }

  nuevoProceso(): void {

    this.paso = 1;

    this.planSeleccionado = null;

    this.placa = '';

    this.vehiculo = null;

    this.consultaRealizada = false;

    this.parqueaderoSeleccionado = null;

    this.fechaInstalacion = '';

    this.horaInstalacion = '';

    this.metodoPago = null;

    this.solicitudRegistrada = false;

    this.scrollProceso();
  }

  private scrollProceso(): void {

    setTimeout(() => {

      document
        .getElementById('proceso')
        ?.scrollIntoView({
          behavior: 'smooth'
        });

    });
  }
}