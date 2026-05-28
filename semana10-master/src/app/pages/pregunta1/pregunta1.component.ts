import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pregunta1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pregunta1.component.html',
  styleUrl: './pregunta1.component.css'
})
export class Pregunta1Component {
  alumno = signal('');
  nota1 = signal<number | null>(null);
  nota2 = signal<number | null>(null);
  nota3 = signal<number | null>(null);
  examenParcial = signal<number | null>(null);
  examenFinal = signal<number | null>(null);

  calculado = signal(false);

  promedioPracticas = computed(() => {
    const n1 = this.nota1() ?? 0;
    const n2 = this.nota2() ?? 0;
    const n3 = this.nota3() ?? 0;
    return (n1 + n2 + n3) / 3;
  });

  notaFinal = computed(() => {
    const practicas = this.promedioPracticas();
    const parcial = this.examenParcial() ?? 0;
    const final = this.examenFinal() ?? 0;
    return practicas * 0.30 + parcial * 0.30 + final * 0.40;
  });

  aprobado = computed(() => this.notaFinal() >= 11);

  calcular() {
    this.calculado.set(true);
  }

  limpiar() {
    this.alumno.set('');
    this.nota1.set(null);
    this.nota2.set(null);
    this.nota3.set(null);
    this.examenParcial.set(null);
    this.examenFinal.set(null);
    this.calculado.set(false);
  }

  setAlumno(val: string) { this.alumno.set(val); }
  setNota1(val: number) { this.nota1.set(val); }
  setNota2(val: number) { this.nota2.set(val); }
  setNota3(val: number) { this.nota3.set(val); }
  setParcial(val: number) { this.examenParcial.set(val); }
  setFinal(val: number) { this.examenFinal.set(val); }
}
