import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../../auth/sesion.service';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  role:string|null=''
  idUser:string|null=''
  nombre:string=''
  dataSource:any=[]

  constructor(private servicio:SesionService, private location:Location, private admin:AdminService){}

  ngOnInit(){
    this.changeHeader()
    if(this.changeHeader!=undefined){
      this.idUser=this.servicio.getId()
    }
    this.admin.verUsuario(Number(this.idUser)).subscribe({
      next: response=>{
        this.dataSource=response;
          this.obtenerNombre(this.dataSource.Usuarios)
      }
    })
  }
  changeHeader(){
    this.role=this.servicio.getRole()
  }
  cerrar(){
    this.servicio.logout()
    this.location.go('/auth/login');
    window.location.reload()
  }
  obtenerNombre(dataSource:any){
    this.nombre=dataSource.nombre
  }
}
