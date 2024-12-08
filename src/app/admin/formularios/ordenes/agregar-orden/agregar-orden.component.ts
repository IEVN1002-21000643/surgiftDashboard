import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-orden',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-orden.component.html',
  styleUrl: './agregar-orden.component.css'
})
export default class AgregarOrdenComponent implements OnInit{
  dataSource:any
  newDataSource:any
  listaProductos:any=[]
  selectProductos:any=[]
  formOrden!:FormGroup
  advertencia=''
  servicio=0
  entrega=238
  total=0
  producto=0
  orden:any={}

  constructor(private fb:FormBuilder, private admin:AdminService){}

  ngOnInit(): void {
    this.formOrden=this.initForm()
    this.total=this.servicio+this.entrega+this.producto
    this.admin.verProductos().subscribe({
      next: response=>{
        this.dataSource=response
        for(let producto of this.dataSource.Productos){
          if(producto.estatus=="Publicado"){
            this.listaProductos.push(producto)
          }
        }
      }
    })
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', Validators.required],
      numInt: [''],
      numExt: ['', Validators.required],
      telefono: ['', Validators.required],
      estatus: ['', Validators.required]
    })
  }

  agregarProducto(producto:any, cantidad:number){
    let exist=0
    if(this.selectProductos.length){
      for(let product of this.selectProductos){
        if(product.idProducto==producto){
          product.cantidad=product.cantidad+cantidad
          this.total=this.total+product.precio
          exist=1
        }
      }
    }
    if(exist==0){
      this.admin.verProducto(producto).subscribe({
        next: response =>{
          this.newDataSource=response
          this.newDataSource.Producto[0].cantidad=cantidad
          this.newDataSource.Producto[0].subtotal=(cantidad*this.newDataSource.Producto[0].precio)
          this.newDataSource.Producto[0].decoracion=''
          this.newDataSource.Producto[0].destinatario=''
          this.newDataSource.Producto[0].fechaLlegada=''
          this.selectProductos.push(this.newDataSource.Producto[0])
          this.total=this.total+this.newDataSource.Producto[0].subtotal
        }
      })
    }
      
  }

  agregarOrden(){
    if(this.formOrden.valid){
      const {nombre, correo, estado, ciudad, colonia, calle, cp, numInt, numExt, telefono, estatus }=this.formOrden.value
      this.advertencia=''
      let numeroInt=''
      if(numInt!=''){
        numeroInt=` num. Interior ${numInt},`
      }
      const direccionFormat=`C. ${calle} #${numExt},${numeroInt} ${colonia}, ${cp} ${ciudad}, ${estado}.`

      this.orden.nombre=nombre
      this.orden.correo=correo
      this.orden.direccion=direccionFormat
      this.orden.telefono=telefono
      this.orden.total=this.total
      this.orden.productos=this.selectProductos
      this.orden.estatus=estatus

      this.admin.agregarNuevaverOrden(this.orden).subscribe({
        next:()=>{},
        complete:()=>{
          window.location.reload()
        }
      })
    }else{
      this.advertencia='Atención: algún campo no ha sido llenado correctamente'
    }
  }
}
