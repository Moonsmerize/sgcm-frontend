import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

interface Cita {
  id: number;
  fecha: string; 
  id_paciente: number;
  id_medico: number;
}

interface CrearCita {
  fecha: string | null; 
  id_paciente: number | null; 
  id_medico: number | null; 
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './citas.html',
})
export class CitasComponent implements OnInit {

  public listaCitas: Cita[] = [];
  private proximoIdCita = 1; 

  public nuevaCita: CrearCita = {
    fecha: null,
    id_paciente: null,
    id_medico: null
  };

  public citaModificar: Cita = {
    id: 0,
    fecha: '',
    id_paciente: 0,
    id_medico: 0
  };
  public idParaCancelar: number | null = null;

  public enviado = false;
  public enviadoModificar = false;
  public enviadoCancelar = false;

  constructor() { }

  ngOnInit(): void {
    this.cargarCitasSimulado();
  }

  cargarCitasSimulado(): void {
    console.log('Cargando citas (simulado):', this.listaCitas);
  }

  agendarCita(): void {
    this.enviado = true;

    if (!this.nuevaCita.fecha || this.nuevaCita.id_paciente === null || this.nuevaCita.id_medico === null) {
      alert('Por favor, completa todos los campos para agendar la cita.');
      return;
    }

    console.log('Intentando agendar cita (simulado):', this.nuevaCita);

    const citaCreada: Cita = {
      id: this.proximoIdCita++,
      fecha: this.nuevaCita.fecha!, 
      id_paciente: this.nuevaCita.id_paciente!,
      id_medico: this.nuevaCita.id_medico! 
    };

    this.listaCitas.push(citaCreada);
    this.listaCitas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());


    console.log('Cita agendada (simulado):', citaCreada);
    alert(`Cita agendada con ID simulado: ${citaCreada.id}`);

    this.nuevaCita = { fecha: null, id_paciente: null, id_medico: null };
    this.enviado = false;
  }

  guardarCambiosCita(): void {
    this.enviadoModificar = true;
    if (!this.citaModificar.id || !this.citaModificar.fecha || !this.citaModificar.id_paciente || !this.citaModificar.id_medico) {
      alert('Por favor, complete todos los campos para modificar la cita.');
      return;
    }

    // Lógica de guardado (simulada)
    console.log('Intentando guardar cambios (simulado):', this.citaModificar);
    alert(`Simulación: Cambios para la cita ID ${this.citaModificar.id} se guardarían.`);
    this.cancelarModificacionCita();
  }

  cancelarModificacionCita(): void {
    this.citaModificar = { id: 0, fecha: '', id_paciente: 0, id_medico: 0 };
    this.enviadoModificar = false;
  }

  confirmarCancelacionCita(): void {
    this.enviadoCancelar = true;
    if (!this.idParaCancelar) {
      alert('Por favor, ingrese el ID de la cita a cancelar.');
      return;
    }

    if (confirm(`¿Está seguro de que desea cancelar la cita con ID ${this.idParaCancelar}? (Simulado)`)) {
      // Lógica de eliminación (simulada)
      console.log(`Simulación: Cita con ID ${this.idParaCancelar} cancelada.`);
      alert(`Simulación: Cita con ID ${this.idParaCancelar} cancelada.`);
      this.idParaCancelar = null;
      this.enviadoCancelar = false;
    }
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