import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { Sensor } from '../../core/models/sensor';
import { Leitura } from '../../core/models/leitura';
import { Area } from '../../core/models/area';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/area`;

  // State Management com Signals
  private _areas = signal<Area[]>([]);
  readonly areas = this._areas.asReadonly();

  // --- MÉTODOS DE ÁREA ---

  listarAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.API).pipe(
      tap(data => this._areas.set(data))
    );
  }

  buscarAreaPorId(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.API}/${id}`);
  }

  cadastrarArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.API, area).pipe(
      tap(novaArea => this._areas.update(prev => [...prev, novaArea]))
    );
  }

  // --- MÉTODOS DE SENSORES (Relacionados à Área) ---

  listarSensoresPorArea(areaId: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.API}/${areaId}/sensores`);
  }

  cadastrarSensor(sensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(`${environment.apiUrl}/sensores`, sensor);
  }

  // --- MÉTODOS DE LEITURA ---

  buscarLeiturasSensor(sensorId: string): Observable<Leitura[]> {
    return this.http.get<Leitura[]>(`${environment.apiUrl}/sensores/${sensorId}/leituras`);
  }
}
