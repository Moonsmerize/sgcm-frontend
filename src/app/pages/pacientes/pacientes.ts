import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Paciente {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
}

interface CrearPaciente {
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
}

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html', 
  // styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public listaPacientes: Paciente[] = [];
  public nuevoPaciente: CrearPaciente = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null
  };

  public pacienteModificar: Paciente = {
    id: 0,
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null
  };

  public idParaEliminar: number | null = null;

  public enviado = false;
  public enviadoModificar = false;
  public enviadoEliminar = false;

  private apiUrl = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  cargarPacientes(): void {
    const url = `${this.apiUrl}/pacientes`;
    console.log(`Cargando pacientes desde: ${url}`);

    this.http.get<Paciente[]>(url)
      .subscribe({
        next: (data) => {
          this.listaPacientes = data;
          console.log('Pacientes cargados:', this.listaPacientes);
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
        }
      });
  }

  darDeAlta(): void {
    this.enviado = true;
     console.log('Intentando dar de alta (simulado):', this.nuevoPaciente);

     if (!this.nuevoPaciente.nombres || !this.nuevoPaciente.apellido_paterno) {
       alert('Por favor, complete todos los campos obligatorios.');
       return;
     }


     const pacienteCreado: Paciente = {
       id: Math.floor(Math.random() * 1000) + 1,
       ...this.nuevoPaciente,
       apellido_materno: this.nuevoPaciente.apellido_materno || null
     };
     this.listaPacientes.push(pacienteCreado);
     alert(`Paciente "${pacienteCreado.nombres}" añadido (simulado).`);
     this.nuevoPaciente = { nombres: '', apellido_paterno: '', apellido_materno: null };
     this.enviado = false;

  }

  guardarCambios(): void {
    this.enviadoModificar = true;
    if (!this.pacienteModificar.id || !this.pacienteModificar.nombres || !this.pacienteModificar.apellido_paterno) {
      alert('Por favor, complete todos los campos obligatorios para modificar.');
      return;
    }
    // Aquí iría la lógica para guardar, pero como es solo visual, la omitimos.
    console.log('Intentando guardar cambios (simulado):', this.pacienteModificar);
    alert(`Simulación: Cambios para el paciente con ID ${this.pacienteModificar.id} se guardarían.`);
    this.cancelarModificacion();
  }

  cancelarModificacion(): void {
    this.pacienteModificar = { id: 0, nombres: '', apellido_paterno: '', apellido_materno: null };
    this.enviadoModificar = false;
  }

  eliminarPaciente(): void {
    this.enviadoEliminar = true;
    if (!this.idParaEliminar) {
      alert('Por favor, ingrese el ID del paciente a eliminar.');
      return;
    }

    if (confirm(`¿Está seguro de que desea eliminar al paciente con ID ${this.idParaEliminar}? (Simulado)`)) {
      // Aquí iría la lógica para eliminar, pero como es solo visual, la omitimos.
      console.log(`Simulación: Paciente con ID ${this.idParaEliminar} eliminado.`);
      alert(`Simulación: Paciente con ID ${this.idParaEliminar} eliminado.`);
      this.idParaEliminar = null;
      this.enviadoEliminar = false;
    }
  }

}