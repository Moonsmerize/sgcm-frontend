import { Component, OnInit } from '@angular/core';
// Importa CommonModule (para *ngIf, *ngFor, pipe date) y FormsModule (para ngModel)
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
// NO importamos HttpClient

// Interfaces para Cita
interface Cita {
  id: number;
  fecha: string; // Guardaremos la fecha como string (formato ISO 'yyyy-MM-ddTHH:mm')
  id_paciente: number;
  id_medico: number;
}

// Para el formulario de nueva cita, no necesitamos el 'id'
interface CrearCita {
  fecha: string | null; // Puede ser null inicialmente
  id_paciente: number | null; // Puede ser null inicialmente
  id_medico: number | null; // Puede ser null inicialmente
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegura que estén aquí
  templateUrl: './citas.html',
  // styleUrls: ['./citas.component.css'] // Comenta o elimina si no hay estilos
})
export class CitasComponent implements OnInit {

  // Array local para simular las citas guardadas
  public listaCitas: Cita[] = [];
  private proximoIdCita = 1; // Para simular IDs autoincrementales

  // Objeto vinculado al formulario de agendar cita
  public nuevaCita: CrearCita = {
    fecha: null,
    id_paciente: null,
    id_medico: null
  };

  constructor() { }

  ngOnInit(): void {
    // Puedes cargar citas de ejemplo si quieres al iniciar
    this.cargarCitasSimulado();
  }

  // --- Métodos Simulados ---

  cargarCitasSimulado(): void {
    console.log('Cargando citas (simulado):', this.listaCitas);
    // En real, aquí iría la llamada GET a /api/citas
  }

  agendarCita(): void {
    // Validación simple (en una app real sería más robusta)
    if (!this.nuevaCita.fecha || this.nuevaCita.id_paciente === null || this.nuevaCita.id_medico === null) {
      alert('Por favor, completa todos los campos para agendar la cita.');
      return;
    }

    console.log('Intentando agendar cita (simulado):', this.nuevaCita);

    // Creamos el objeto Cita completo con un ID simulado
    const citaCreada: Cita = {
      id: this.proximoIdCita++,
      // Aseguramos que los valores no sean null (aunque el 'required' del HTML ayuda)
      fecha: this.nuevaCita.fecha!, 
      id_paciente: this.nuevaCita.id_paciente!,
      id_medico: this.nuevaCita.id_medico! 
    };

    // Añadimos la cita a nuestro array local
    this.listaCitas.push(citaCreada);
    // Opcional: Ordenar la lista por fecha
    this.listaCitas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());


    console.log('Cita agendada (simulado):', citaCreada);
    alert(`Cita agendada con ID simulado: ${citaCreada.id}`);

    // Limpiamos el formulario
    this.nuevaCita = { fecha: null, id_paciente: null, id_medico: null };
  }

  eliminarCita(id: number): void {
    console.log(`Intentando eliminar cita con ID ${id} (simulado)`);

    if (!confirm(`¿Estás seguro de cancelar la cita con ID ${id}? (Simulado)`)) {
      return;
    }

    const index = this.listaCitas.findIndex(cita => cita.id === id);

    if (index !== -1) {
      this.listaCitas.splice(index, 1);
      console.log(`Cita con ID ${id} eliminada (simulado).`);
      alert(`Cita con ID ${id} cancelada (simulado).`);
    } else {
      console.warn(`No se encontró cita con ID ${id} para eliminar.`);
      alert(`No se encontró cita con ID ${id}.`);
    }
  }

}