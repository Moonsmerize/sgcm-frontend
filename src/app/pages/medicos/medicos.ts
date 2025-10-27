import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Medico {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  cedula: string;
}

interface CrearMedico {
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  cedula: string;
}

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicos.html',
})
export class MedicosComponent implements OnInit {

  public listaMedicos: Medico[] = [];
  private proximoId = 1; 

  public nuevoMedico: CrearMedico = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null,
    cedula: ''
  };

  public medicoModificar: Medico = {
    id: 0,
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null,
    cedula: ''
  };

  public medicoSeleccionado: Medico | null = null;

  public cedulaParaEliminar: string = '';

  public enviadoAlta = false;
  public enviadoModificar = false;
  public enviadoEliminar = false;

  constructor() { }

  ngOnInit(): void {
    this.listaMedicos = [
      { id: this.proximoId++, nombres: 'Juan Carlos', apellido_paterno: 'Pérez', apellido_materno: 'López', cedula: '12345678' },
      { id: this.proximoId++, nombres: 'Ana María', apellido_paterno: 'García', apellido_materno: null, cedula: '87654321' }
    ];
    console.log('Médicos iniciales (simulado):', this.listaMedicos);
  }

  darDeAltaMedico(): void {
    this.enviadoAlta = true;
    console.log('Intentando dar de alta médico (simulado):', this.nuevoMedico);

    if (!this.nuevoMedico.nombres || !this.nuevoMedico.apellido_paterno || !this.nuevoMedico.cedula) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const medicoCreado: Medico = {
      id: this.proximoId++,
      ...this.nuevoMedico,
      apellido_materno: this.nuevoMedico.apellido_materno || null,
    };

    this.listaMedicos.push(medicoCreado); 
    console.log('Médico añadido (simulado):', medicoCreado);
    alert(`Médico "${medicoCreado.nombres}" añadido con ID simulado: ${medicoCreado.id}`);

    this.nuevoMedico = { nombres: '', apellido_paterno: '', apellido_materno: null, cedula: '' };
    this.enviadoAlta = false;
  }

  seleccionarMedicoParaModificar(medico: Medico): void {
    console.log('Seleccionado para modificar:', medico);
    this.medicoSeleccionado = { ...medico };
  }

  guardarCambios(): void {
    this.enviadoModificar = true;
    if (!this.medicoModificar.id || !this.medicoModificar.nombres || !this.medicoModificar.apellido_paterno || !this.medicoModificar.cedula) {
      alert('Por favor, complete todos los campos obligatorios para modificar.');
      return;
    }

    console.log('Intentando guardar cambios (simulado):', this.medicoModificar);

    const index = this.listaMedicos.findIndex(m => m.id === this.medicoModificar.id);

    if (index !== -1) {
      this.listaMedicos[index] = {
        ...this.medicoModificar, 
        apellido_materno: this.medicoModificar.apellido_materno || null
      };
      console.log('Cambios guardados (simulado). Lista actualizada:', this.listaMedicos);
      alert(`Cambios guardados para el médico con ID: ${this.medicoModificar.id}`);
      this.cancelarModificacion(); 
    } else {
      console.error(`No se encontró el médico con ID ${this.medicoModificar.id} para actualizar.`);
      alert(`Error: No se encontró el médico con ID ${this.medicoModificar.id} para actualizar.`);
    }
  }

  cancelarModificacion(): void {
    this.medicoModificar = { id: 0, nombres: '', apellido_paterno: '', apellido_materno: null, cedula: '' };
    this.enviadoModificar = false;
    console.log('Modificación cancelada.');
  }

  eliminarMedico(id: number): void {
    console.log(`Intentando eliminar médico con ID ${id} (simulado)`);

    if (!confirm(`¿Estás seguro de eliminar al médico con ID ${id}? (Simulado)`)) {
      return;
    }

    const index = this.listaMedicos.findIndex(medico => medico.id === id);

    if (index !== -1) {
      this.listaMedicos.splice(index, 1); 
      console.log(`Médico con ID ${id} eliminado (simulado).`);
      alert(`Médico con ID ${id} eliminado (simulado).`);
      if (this.medicoSeleccionado && this.medicoSeleccionado.id === id) {
        this.cancelarModificacion();
      }
    } else {
      console.warn(`No se encontró médico con ID ${id} para eliminar.`);
      alert(`No se encontró médico con ID ${id}.`);
    }
  }

  eliminarPorCedula(): void {
    this.enviadoEliminar = true;
    if (!this.cedulaParaEliminar || this.cedulaParaEliminar.trim() === '') {
      alert('Por favor, ingresa una cédula profesional para eliminar.');
      return;
    }
    const cedula = this.cedulaParaEliminar.trim();
    console.log(`Intentando eliminar médico con cédula ${cedula} (simulado)`);

    const medicoEncontrado = this.listaMedicos.find(medico => medico.cedula === cedula);

    if (medicoEncontrado) {
      this.eliminarMedico(medicoEncontrado.id); 
      this.cedulaParaEliminar = ''; 
      this.enviadoEliminar = false;
    } else {
      console.warn(`No se encontró médico con cédula ${cedula} para eliminar.`);
      alert(`No se encontró médico con la cédula ${cedula}.`);
    }
  }
}