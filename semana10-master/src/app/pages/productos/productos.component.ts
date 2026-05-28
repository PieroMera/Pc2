import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';

interface Producto {
  nombre: string;
  categoria: string;
  precio: number;
  fechaRegistro: Date;
  stock: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, UpperCasePipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      nombre: 'Laptop Lenovo IdeaPad',
      categoria: 'Tecnología',
      precio: 3500.00,
      fechaRegistro: new Date('2026-05-10'),
      stock: 8
    },
    {
      nombre: 'Mouse Inalámbrico Logitech',
      categoria: 'Accesorios',
      precio: 85.50,
      fechaRegistro: new Date('2026-05-12'),
      stock: 25
    },
    {
      nombre: 'Monitor Samsung 24 Pulgadas',
      categoria: 'Tecnología',
      precio: 720.00,
      fechaRegistro: new Date('2026-05-15'),
      stock: 12
    },
    {
      nombre: 'Teclado Mecánico Redragon',
      categoria: 'Accesorios',
      precio: 210.00,
      fechaRegistro: new Date('2026-05-18'),
      stock: 30
    },
    {
      nombre: 'Auriculares Sony WH-1000XM5',
      categoria: 'Audio',
      precio: 1150.00,
      fechaRegistro: new Date('2026-05-20'),
      stock: 5
    },
    {
      nombre: 'Webcam Logitech C920',
      categoria: 'Periféricos',
      precio: 390.00,
      fechaRegistro: new Date('2026-05-22'),
      stock: 15
    }
  ];
}
