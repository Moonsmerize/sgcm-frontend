import { Component, OnInit } from '@angular/core';
// Importa CommonModule y FormsModule para *ngIf, *ngFor, [(ngModel)]
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// NO importamos HttpClient ya que simularemos los datos

// Interfaces para Médico (igual que antes)
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
  imports: [CommonModule, FormsModule], // Asegúrate que estén aquí
  templateUrl: './medicos.html',
  // styleUrls: ['./medicos.component.css'] // Comenta o elimina si no hay estilos
})
export class MedicosComponent implements OnInit {

  // Usaremos un array local para simular la base de datos
  public listaMedicos: Medico[] = [];
  // Variable para llevar la cuenta del próximo ID a asignar (simulación)
  private proximoId = 1; 

  // Objeto vinculado al formulario de alta
  public nuevoMedico: CrearMedico = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null,
    cedula: ''
  };

  // No necesitamos apiUrl ni inyectar HttpClient por ahora
  constructor() { }

  ngOnInit(): void {
    // Al iniciar, podemos cargar algunos datos de ejemplo si queremos
    this.cargarMedicosSimulado(); 
  }

  // --- Métodos Simulados ---

  cargarMedicosSimulado(): void {
    // Simplemente mostramos los médicos que tenemos en nuestro array local
    console.log('Cargando médicos (simulado):', this.listaMedicos);
    // En una implementación real, aquí iría la llamada HTTP GET
  }

  darDeAltaMedico(): void {
    console.log('Intentando dar de alta médico (simulado):', this.nuevoMedico);

    // Creamos un nuevo objeto Medico completo, asignando un ID simulado
    const medicoCreado: Medico = {
      id: this.proximoId++, // Asigna el ID actual y luego lo incrementa
      nombres: this.nuevoMedico.nombres,
      apellido_paterno: this.nuevoMedico.apellido_paterno,
      apellido_materno: this.nuevoMedico.apellido_materno || null,
      cedula: this.nuevoMedico.cedula
    };

    // Añadimos el nuevo médico a nuestro array local
    this.listaMedicos.push(medicoCreado);

    console.log('Médico añadido (simulado):', medicoCreado);
    alert(`Médico "${medicoCreado.nombres}" añadido con ID simulado: ${medicoCreado.id}`);

    // Limpiamos el formulario
    this.nuevoMedico = { nombres: '', apellido_paterno: '', apellido_materno: null, cedula: '' };

    // No necesitamos recargar desde una API, la lista ya está actualizada.
  }

  eliminarMedico(id: number): void {
    console.log(`Intentando eliminar médico con ID ${id} (simulado)`);
    
    // Preguntamos al usuario para confirmar
    if (!confirm(`¿Estás seguro de eliminar al médico con ID ${id}? (Simulado)`)) {
      return; 
    }

    // Buscamos el índice del médico en el array
    const index = this.listaMedicos.findIndex(medico => medico.id === id);

    if (index !== -1) {
      // Si se encontró, lo eliminamos del array
      this.listaMedicos.splice(index, 1);
      console.log(`Médico con ID ${id} eliminado (simulado).`);
      alert(`Médico con ID ${id} eliminado (simulado).`);
    } else {
      console.warn(`No se encontró médico con ID ${id} para eliminar.`);
      alert(`No se encontró médico con ID ${id}.`);
    }
     // No necesitamos recargar desde una API.
  }

  // --- PENDIENTE: Implementar simulación para Modificar ---
  // seleccionarMedicoParaModificar(medico: Medico): void { ... }
  // guardarCambiosMedico(): void { ... } // Modificaría el objeto en el array listaMedicos

}