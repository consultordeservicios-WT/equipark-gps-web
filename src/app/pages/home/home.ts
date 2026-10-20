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

  garantia = false;

  autorizacionDispositivo = false;

  tratamientoDatos = false;

  ofertas = false;

  metodoPago: 'PSE' | 'TARJETA' | null = null;

  fechaInstalacion = '';

  horaInstalacion = '';

  parqueaderoSeleccionado: Parqueadero | null = null;

  solicitudRegistrada = false;

  minDate = '';

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

  constructor() {
    this.calcularFechaMinima();
  }

  calcularFechaMinima(): void {
    const fecha = new Date();

    fecha.setDate(fecha.getDate() + 1);

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    this.minDate = `${year}-${month}-${day}`;
  }

  seleccionarPlan(plan: 'OBD' | 'AVL'): void {
    this.planSeleccionado = plan;
    this.paso = 2;

    this.scrollProceso();
  }

  consultarPlaca(): void {

    if (!this.placa.trim()) {
      this.mensajeConsulta = 'Ingresa una placa para continuar.';
      return;
    }

    this.consultando = true;

    const placaNormalizada =
      this.placa.toUpperCase().replace(/\s/g, '');

    setTimeout(() => {

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
        }
      ];

      const encontrado = vehiculos.find(
        v => v.placa === placaNormalizada
      );

      if (encontrado) {

        this.vehiculo = encontrado;

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

        this.mensajeConsulta =
          'No encontramos información. Completa los datos del vehículo.';
      }

      this.placa = placaNormalizada;
      this.consultaRealizada = true;
      this.consultando = false;

    }, 500);
  }

  continuarDatos(): void {

    if (!this.vehiculo) {
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
      alert('Completa todos los campos obligatorios.');
      return;
    }

    if (
      this.datosUsuario.pin !==
      this.datosUsuario.confirmarPin
    ) {
      alert('Los PIN no coinciden.');
      return;
    }

    if (!/^\d{4}$/.test(this.datosUsuario.pin)) {
      alert('El PIN debe tener 4 dígitos.');
      return;
    }

    this.paso = 4;

    this.scrollProceso();
  }

  seleccionarPago(metodo: 'PSE' | 'TARJETA'): void {
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
      alert('Selecciona punto y fecha de instalación.');
      return;
    }

    if (this.fechaInstalacion < this.minDate) {
      alert(
        'La instalación debe reservarse con mínimo un día de anticipación.'
      );
      return;
    }

    this.solicitudRegistrada = true;

    localStorage.setItem(
      'equipark_solicitud',
      JSON.stringify({
        plan: this.planSeleccionado,
        placa: this.placa,
        vehiculo: this.vehiculo,
        usuario: this.datosUsuario,
        garantia: this.garantia,
        metodoPago: this.metodoPago,
        parqueadero: this.parqueaderoSeleccionado,
        fecha: this.fechaInstalacion,
        hora: this.horaInstalacion
      })
    );

    this.paso = 6;

    this.scrollProceso();
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
    this.consultando = false;
    this.consultaRealizada = false;
    this.mensajeConsulta = '';
    this.metodoPago = null;
    this.parqueaderoSeleccionado = null;
    this.fechaInstalacion = '';
    this.horaInstalacion = '';
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

    }, 50);
  }
}