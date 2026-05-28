import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre = signal('');
  categoria = signal('');
  precio = signal<number | null>(null);
  stock = signal<number | null>(null);

  productos = signal<Producto[]>([]);
  errores = signal<string[]>([]);
  guardado = signal(false);

  guardar() {
    const errs: string[] = [];

    if (!this.nombre()) errs.push('El nombre del producto es obligatorio.');
    if (!this.categoria()) errs.push('La categoría es obligatoria.');
    if (this.precio() === null || this.precio()! <= 0) errs.push('El precio debe ser mayor a 0.');
    if (this.stock() === null || this.stock()! < 0) errs.push('El stock no puede ser negativo.');

    this.errores.set(errs);

    if (errs.length === 0) {
      this.productos.update(lista => [
        ...lista,
        {
          nombre: this.nombre(),
          categoria: this.categoria(),
          precio: this.precio()!,
          stock: this.stock()!
        }
      ]);
      this.guardado.set(true);
      this.limpiarCampos();
    }
  }

  limpiarCampos() {
    this.nombre.set('');
    this.categoria.set('');
    this.precio.set(null);
    this.stock.set(null);
    this.errores.set([]);
  }

  eliminar(index: number) {
    this.productos.update(lista => lista.filter((_, i) => i !== index));
  }
}
