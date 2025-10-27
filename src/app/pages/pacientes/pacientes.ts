import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importa HttpClient y HttpClientModule (aunque HttpClientModule se provee globalmente ahora)
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

// Interfaces: Definen la "forma" de los datos que manejaremos.
// Es buena práctica tenerlas en archivos separados (ej. src/app/models/paciente.model.ts)
interface Paciente {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null; // Puede ser string, null o no existir
}

interface CrearPaciente {
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
}

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    // HttpClientModule // No es necesario importar HttpClientModule aquí si usas provideHttpClient en app.config.ts
    ], 
  templateUrl: './pacientes.html',
  // styleUrls: ['./pacientes.component.css'] 
})
export class PacientesComponent implements OnInit {

  // Propiedad para guardar la lista de pacientes obtenida de la API
  public listaPacientes: Paciente[] = [];

  // Propiedad vinculada al formulario de alta con [(ngModel)]
  public nuevoPaciente: CrearPaciente = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: null // Inicializar explícitamente ayuda
  };

  // URL base de tu API de Rust (¡Asegúrate que coincida con cómo la configuraste!)
  private apiUrl = 'http://127.0.0.1:3000/api'; // Cambia si es necesario

  // Inyección de dependencias: Angular nos da una instancia de HttpClient
  constructor(private http: HttpClient) { }

  // Método que se ejecuta automáticamente después de que Angular crea el componente
  ngOnInit(): void {
    // Es el lugar ideal para cargar datos iniciales
    this.cargarPacientes();
  }

  // --- Métodos para interactuar con la API ---

  // Obtiene la lista de todos los pacientes
  cargarPacientes(): void {
    const url = `${this.apiUrl}/pacientes`; // Construye la URL completa
    console.log(`Cargando pacientes desde: ${url}`); // Mensaje para depuración

    // Realiza la petición GET. Espera recibir un array de Paciente (<Paciente[]>)
    this.http.get<Paciente[]>(url)
      .subscribe({
        // Callback para cuando la petición es exitosa
        next: (data) => {
          this.listaPacientes = data; // Actualiza la lista que se muestra en la tabla
          console.log('Pacientes cargados:', this.listaPacientes);
        },
        // Callback para cuando ocurre un error
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          // Podrías mostrar un mensaje al usuario aquí
          alert(`Error al cargar pacientes: ${error.message}. ¿Está corriendo el backend en ${this.apiUrl}?`);
        }
      });
  }

  // Envía los datos del formulario 'nuevoPaciente' a la API para crear uno nuevo
  darDeAlta(): void {
    const url = `${this.apiUrl}/pacientes`; // URL para crear pacientes (POST)
    console.log(`Intentando dar de alta:`, this.nuevoPaciente); // Mensaje para depuración

    // Asegúrate que el apellido materno vacío se envíe como null si tu API lo espera así
    const pacienteParaEnviar: CrearPaciente = {
      ...this.nuevoPaciente,
      apellido_materno: this.nuevoPaciente.apellido_materno || null 
    };

    // Realiza la petición POST. Espera recibir el Paciente creado como respuesta (<Paciente>)
    this.http.post<Paciente>(url, pacienteParaEnviar)
      .subscribe({
        // Callback para cuando la creación es exitosa
        next: (pacienteCreado) => {
          console.log('Paciente creado:', pacienteCreado);
          alert(`Paciente "${pacienteCreado.nombres}" dado de alta con ID: ${pacienteCreado.id}`);
          
          // Opción 1: Añadir directamente a la lista (más rápido visualmente)
          // this.listaPacientes.push(pacienteCreado); 
          
          // Opción 2: Volver a cargar toda la lista (asegura consistencia si hay IDs generados en backend)
          this.cargarPacientes(); 

          // Limpia el formulario para el siguiente ingreso
          this.nuevoPaciente = { nombres: '', apellido_paterno: '', apellido_materno: null };
        },
        // Callback para cuando ocurre un error
        error: (error) => {
          console.error('Error al dar de alta paciente:', error);
          alert(`Error al dar de alta: ${error.message}`);
        }
      });
  }

  // --- PENDIENTE: Métodos para Modificar y Eliminar ---
  // Ejemplo básico para eliminar (necesitarás añadir botones en el HTML)
  /*
  eliminarPaciente(id: number): void {
    if (!confirm(`¿Estás seguro de eliminar al paciente con ID ${id}?`)) {
      return; // No hacer nada si el usuario cancela
    }

    const url = `${this.apiUrl}/pacientes/${id}`; // Asumiendo que tu API usa DELETE /api/pacientes/:id
    console.log(`Intentando eliminar paciente con ID: ${id} en ${url}`);

    this.http.delete(url)
      .subscribe({
        next: () => {
          alert(`Paciente con ID ${id} eliminado.`);
          // Vuelve a cargar la lista para reflejar el cambio
          this.cargarPacientes(); 
        },
        error: (error) => {
          console.error(`Error al eliminar paciente ${id}:`, error);
          alert(`Error al eliminar: ${error.message}`);
        }
      });
  }
  */
}