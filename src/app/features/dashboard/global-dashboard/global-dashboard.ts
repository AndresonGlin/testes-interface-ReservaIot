import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AreaService } from '../../../shared/services/area-service';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexGrid
} from 'ng-apexcharts';

@Component({
  selector: 'app-global-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './global-dashboard.html',
  styleUrl: './global-dashboard.css'
})
export class GlobalDashboard implements OnInit {

  areaService = inject(AreaService);

  // MÉTRICAS

  totalAlertas = signal(3);

  // DADOS MOCK

  private dadosGrafico = [
    { hora: '00:00', valor: 22 },
    { hora: '04:00', valor: 20 },
    { hora: '08:00', valor: 25 },
    { hora: '12:00', valor: 31 },
    { hora: '16:00', valor: 29 },
    { hora: '20:00', valor: 24 }
  ];

  public series: ApexAxisChartSeries = [];
  public labels: string[] = [];

  public chartOptions: {
    chart: ApexChart;
    stroke: ApexStroke;
    colors: string[];
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    tooltip: ApexTooltip;
  } = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#10b981'],
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4
    },
    tooltip: {
      theme: 'light'
    }
  };

  ngOnInit() {
    this.series = [{
      name: 'Temperatura Média',
      data: this.dadosGrafico.map(d => d.valor)
    }];

    this.labels = this.dadosGrafico.map(d => d.hora);

    this.areaService.listarAreas().subscribe({
      error: err => console.warn('401 esperado:', err)
    });
  }

  get totalAreas() {
    return this.areaService.areas().length;
  }
}
