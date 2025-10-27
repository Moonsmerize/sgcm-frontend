import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// No HttpClient needed for simulated logic

// --- Interfaces ---
interface Medico {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  cedula: string;
}

// Para el formulario de alta
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
  // styleUrls: ['./medicos.component.css'] // Opcional
})
export class MedicosComponent implements OnInit {

  // --- Propiedades del Componente ---

  // Lista para almacenar los médicos (simulación de BD)
  public listaMedicos: Medico[] = [];
  private proximoId = 1; // Para generar IDs únicos simulados

  // Objeto vinculado al formulario de alta [(ngModel)]="nuevoMedico..."
  public nuevoMedico: CrearMedico = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null,
    cedula: ''
  };

  // Objeto para guardar el médico que se está modificando.
  // Vinculado al formulario de modificación con [(ngModel)]="medicoSeleccionado..."
  // Usamos 'null' para indicar que no hay ninguno seleccionado.
  public medicoSeleccionado: Medico | null = null;

  // Variable vinculada al input del formulario de eliminar por cédula [(ngModel)]="cedulaParaEliminar"
  public cedulaParaEliminar: string = '';

  // --- Constructor y Ciclo de Vida ---

  constructor() { }

  ngOnInit(): void {
    // Puedes precargar algunos médicos para probar
    this.listaMedicos = [
      { id: this.proximoId++, nombres: 'Juan Carlos', apellido_paterno: 'Pérez', apellido_materno: 'López', cedula: '12345678' },
      { id: this.proximoId++, nombres: 'Ana María', apellido_paterno: 'García', apellido_materno: null, cedula: '87654321' }
    ];
    console.log('Médicos iniciales (simulado):', this.listaMedicos);
  }

  // --- Métodos para Simulación CRUD ---

  darDeAltaMedico(): void {
    console.log('Intentando dar de alta médico (simulado):', this.nuevoMedico);

    const medicoCreado: Medico = {
      id: this.proximoId++,
      // Usamos el operador 'spread' (...) para copiar propiedades
      ...this.nuevoMedico,
      // Aseguramos que el apellido materno sea null si está vacío
      apellido_materno: this.nuevoMedico.apellido_materno || null,
    };

    this.listaMedicos.push(medicoCreado); // Añade a la lista local
    console.log('Médico añadido (simulado):', medicoCreado);
    alert(`Médico "${medicoCreado.nombres}" añadido con ID simulado: ${medicoCreado.id}`);

    // Limpia el formulario
    this.nuevoMedico = { nombres: '', apellido_paterno: '', apellido_materno: null, cedula: '' };
  }

  seleccionarMedicoParaModificar(medico: Medico): void {
    console.log('Seleccionado para modificar:', medico);
    // IMPORTANTE: Creamos una copia del objeto médico. Si asignamos directamente (this.medicoSeleccionado = medico;),
    // los cambios en el formulario se reflejarían inmediatamente en la tabla antes de guardar,
    // porque ambos apuntarían al mismo objeto en memoria.
    this.medicoSeleccionado = { ...medico };
  }

  guardarCambiosMedico(): void {
    if (!this.medicoSeleccionado) {
      console.error("No hay médico seleccionado para guardar cambios.");
      return;
    }

    console.log('Intentando guardar cambios (simulado):', this.medicoSeleccionado);

    // Buscamos el índice del médico original en la lista
    const index = this.listaMedicos.findIndex(m => m.id === this.medicoSeleccionado!.id);

    if (index !== -1) {
      // Reemplazamos el médico antiguo con la versión modificada
      this.listaMedicos[index] = {
        ...this.medicoSeleccionado, // Copia los datos modificados
        // Aseguramos que el apellido materno sea null si está vacío
        apellido_materno: this.medicoSeleccionado.apellido_materno || null
      };
      console.log('Cambios guardados (simulado). Lista actualizada:', this.listaMedicos);
      alert(`Cambios guardados para el médico con ID: ${this.medicoSeleccionado.id}`);
      this.cancelarModificacion(); // Oculta el formulario de modificación
    } else {
      console.error(`No se encontró el médico con ID ${this.medicoSeleccionado.id} para actualizar.`);
      alert('Error: No se encontró el médico para actualizar.');
    }
  }

  cancelarModificacion(): void {
    this.medicoSeleccionado = null; // Limpia la selección, ocultando el formulario de modificación
    console.log('Modificación cancelada.');
  }

  eliminarMedico(id: number): void {
    console.log(`Intentando eliminar médico con ID ${id} (simulado)`);

    if (!confirm(`¿Estás seguro de eliminar al médico con ID ${id}? (Simulado)`)) {
      return;
    }

    const index = this.listaMedicos.findIndex(medico => medico.id === id);

    if (index !== -1) {
      this.listaMedicos.splice(index, 1); // Elimina el elemento del array
      console.log(`Médico con ID ${id} eliminado (simulado).`);
      alert(`Médico con ID ${id} eliminado (simulado).`);
      // Si el médico eliminado era el que se estaba modificando, cancelamos la modificación
      if (this.medicoSeleccionado && this.medicoSeleccionado.id === id) {
        this.cancelarModificacion();
      }
    } else {
      console.warn(`No se encontró médico con ID ${id} para eliminar.`);
      alert(`No se encontró médico con ID ${id}.`);
    }
  }

  eliminarMedicoPorCedula(): void {
    if (!this.cedulaParaEliminar || this.cedulaParaEliminar.trim() === '') {
      alert('Por favor, ingresa una cédula profesional para eliminar.');
      return;
    }
    const cedula = this.cedulaParaEliminar.trim();
    console.log(`Intentando eliminar médico con cédula ${cedula} (simulado)`);

    // Buscamos el médico por cédula
    const medicoEncontrado = this.listaMedicos.find(medico => medico.cedula === cedula);

    if (medicoEncontrado) {
      // Si se encuentra, llamamos a la función de eliminar por ID
      this.eliminarMedico(medicoEncontrado.id); // Reutilizamos la lógica y la confirmación
      this.cedulaParaEliminar = ''; // Limpiamos el campo del formulario
    } else {
      console.warn(`No se encontró médico con cédula ${cedula} para eliminar.`);
      alert(`No se encontró médico con la cédula ${cedula}.`);
    }
  }
}