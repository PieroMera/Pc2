import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculoService, NotaResponse } from '../../services/calculo.service';

@Component({
  selector: 'app-pregunta1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pregunta1.component.html',
  styleUrl: './pregunta1.component.css'
})
export class Pregunta1Component {
  private calculoService = inject(CalculoService);

  alumno = signal('');
  codigoEstudiante = signal('');
  nota1 = signal<number | null>(null);
  nota2 = signal<number | null>(null);
  nota3 = signal<number | null>(null);
  examenParcial = signal<number | null>(null);
  examenFinal = signal<number | null>(null);

  calculado = signal(false);
  cargando = signal(false);
  error = signal('');
  resultado = signal<NotaResponse | null>(null);

  calcular() {
    this.cargando.set(true);
    this.error.set('');
    this.calculoService.calcularNota({
      alumno: this.alumno(),
      codigoEstudiante: this.codigoEstudiante(),
      nota1: this.nota1(),
      nota2: this.nota2(),
      nota3: this.nota3(),
      examenParcial: this.examenParcial(),
      examenFinal: this.examenFinal()
    }).subscribe({
      next: (res) => {
        this.resultado.set(res);
        this.calculado.set(true);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al conectar con el servidor.');
        this.cargando.set(false);
      }
    });
  }

  limpiar() {
    this.alumno.set('');
    this.codigoEstudiante.set('');
    this.nota1.set(null);
    this.nota2.set(null);
    this.nota3.set(null);
    this.examenParcial.set(null);
    this.examenFinal.set(null);
    this.calculado.set(false);
    this.resultado.set(null);
    this.error.set('');
  }

  setAlumno(val: string) { this.alumno.set(val); }
  setCodigo(val: string) { this.codigoEstudiante.set(val); }
  setNota1(val: number) { this.nota1.set(val); }
  setNota2(val: number) { this.nota2.set(val); }
  setNota3(val: number) { this.nota3.set(val); }
  setParcial(val: number) { this.examenParcial.set(val); }
  setFinal(val: number) { this.examenFinal.set(val); }
}
