import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export default class GraficasComponent implements OnInit{
  @ViewChild('graficoVentas') graficoVentaMes!: ElementRef;
  @ViewChild('graficoUsuario') graficoUsuarioMes!: ElementRef;
  @ViewChild('graficoProducto') graficoProductoMes!: ElementRef;
  @ViewChild('graficoEstatusOrden') graficoEstatusOrden!: ElementRef;
  graficoVenta: Chart | undefined;
  graficoUsuario: Chart | undefined;
  graficoProducto: Chart | undefined;
  graficoEstatus: Chart | undefined;
  ventaSoruce:any
  usuarioSoruce:any
  productosSoruce:any
  estatusSoruce:any
  ventasX:any=[]
  ventasY:any=[]
  usuarioX:any=[]
  usuarioY:any=[]
  productosX:any=[]
  productosY:any=[]
  labelPie:any=[]
  datosPie:any=[]

  constructor(private admin:AdminService){}

  ngOnInit(): void {
    this.admin.verVentasMes().subscribe({
      next: response=>{
        this.ventaSoruce=response
        this.ventasX=this.ventaSoruce.grafica.graficaX
        this.ventasY=this.ventaSoruce.grafica.graficaY
        },
      complete: ()=>this.graficaVentas()
    })

    this.admin.verUsuariosMes().subscribe({
      next: response=>{
        this.usuarioSoruce=response
        this.usuarioX=this.usuarioSoruce.grafica.graficaX
        this.usuarioY=this.usuarioSoruce.grafica.graficaY
        },
      complete: ()=>this.graficaUsuario()
    })

    this.admin.verProductosMes().subscribe({
      next: response=>{
        this.productosSoruce=response
        this.productosX=this.productosSoruce.grafica.graficaX
        this.productosY=this.productosSoruce.grafica.graficaY
        },
      complete: ()=>this.graficaProducto()
    })

    this.admin.verGraficoPie().subscribe({
      next: response=>{
        this.estatusSoruce=response
        this.labelPie=this.estatusSoruce.grafica.graficaX
        this.datosPie=this.estatusSoruce.grafica.graficaY
        },
      complete: ()=>this.graficaEstatus()
    })
  }

  graficaVentas() {
    if (this.graficoVenta) {
      this.graficoVenta.destroy();
    }
    this.graficoVenta = new Chart(this.graficoVentaMes.nativeElement, {
      type: 'bar',
      data: {
        labels: this.ventasX,
        datasets: [{
          label: 'Ganacias totales por mes',
          data: this.ventasY,
          backgroundColor: ['rgba(75, 192, 192, 0.6)']
        }]
      }
    });
  }
  graficaUsuario() {
    if (this.graficoUsuario) {
      this.graficoUsuario.destroy();
    }
    this.graficoUsuario = new Chart(this.graficoUsuarioMes.nativeElement, {
      type: 'bar',
      data: {
        labels: this.usuarioX,
        datasets: [{
          label: 'Usuarios registrador por mes',
          data: this.usuarioY,
          backgroundColor: ['rgba(255, 99, 132, 0.6)']
        }]
      }
    });
  }
  graficaProducto() {
    if (this.graficoProducto) {
      this.graficoProducto.destroy();
    }
    this.graficoProducto = new Chart(this.graficoProductoMes.nativeElement, {
      type: 'bar',
      data: {
        labels: this.productosX,
        datasets: [{
          label: 'Productos vendidos por mes',
          data: this.productosY
        }]
      }
    });
  }
  graficaEstatus(){
    if(this.graficoEstatus){
      this.graficoEstatus.destroy()
    }
    this.graficoEstatus = new Chart(this.graficoEstatusOrden.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labelPie,
        datasets: [{
          label: 'Finalizaciones de ventas',
          data: this.datosPie
        }]
      }
    });
  }
}
