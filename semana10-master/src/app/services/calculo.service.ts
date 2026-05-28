import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotaRequest {
  alumno: string;
  codigoEstudiante: string;
  nota1: number | null;
  nota2: number | null;
  nota3: number | null;
  examenParcial: number | null;
  examenFinal: number | null;
}

export interface NotaResponse {
  alumno: string;
  codigoEstudiante: string;
  promedioPracticas: number;
  notaFinal: number;
  aprobado: boolean;
  observacion: string;
}

@Injectable({ providedIn: 'root' })
export class CalculoService {
  private http = inject(HttpClient);

  calcularNota(data: NotaRequest): Observable<NotaResponse> {
    return this.http.post<NotaResponse>('/api/calcular-nota', data);
  }
}
