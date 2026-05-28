import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

function rangoValidator(min: number, max: number) {
  return (control: AbstractControl) => {
    const val = Number(control.value);
    if (control.value === null || control.value === '') return null;
    return val >= min && val <= max ? null : { rango: { min, max, actual: val } };
  };
}

@Component({
  selector: 'app-pregunta2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pregunta2.component.html',
  styleUrl: './pregunta2.component.css'
})
export class Pregunta2Component {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre:  ['', [Validators.required, Validators.minLength(3)]],
    correo:  ['', [Validators.required, Validators.email]],
    peso:    [null as number | null, [Validators.required, rangoValidator(10, 300)]],
    altura:  [null as number | null, [Validators.required, rangoValidator(0.5, 2.5)]]
  });

  resultado: { imc: number; categoria: string; nombre: string } | null = null;
  enviado = false;

  get nombre()  { return this.form.get('nombre')!; }
  get correo()  { return this.form.get('correo')!; }
  get peso()    { return this.form.get('peso')!; }
  get altura()  { return this.form.get('altura')!; }

  private categoriaIMC(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 25)   return 'Peso saludable';
    if (imc < 30)   return 'Sobrepeso';
    return 'Obesidad';
  }

  enviar() {
    this.enviado = true;
    if (this.form.invalid) return;

    const { nombre, peso, altura } = this.form.value;
    const imc = Number(peso) / (Number(altura) ** 2);
    this.resultado = { imc, categoria: this.categoriaIMC(imc), nombre: nombre! };
  }

  limpiar() {
    this.form.reset();
    this.enviado = false;
    this.resultado = null;
  }
}
