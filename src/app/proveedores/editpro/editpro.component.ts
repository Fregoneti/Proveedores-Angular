import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editpro',
  templateUrl: './editpro.component.html',
  styleUrls: ['./editpro.component.css']
})
export class EditproComponent implements OnInit {

  id: any;
  proveedor: any = {};
  proveedorForm: FormGroup;
  nombre: any;
  cif: any;
  cp: any = 0;
  localidad: any;
  telefono: any = 0;
  mail: any;
  direccion:any;
  p_contacto: any;
  provincia:any;




  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra',
    'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
    'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

  constructor(private pf: FormBuilder,
    private proveedorService: ProveedoresService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.proveedorService.getProveedor(this.id)
        .subscribe(proveedor => {
          this.proveedor = proveedor


        })
    });
  }

  

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedor(this.proveedor)
      .subscribe(newpres => {
      })
    this.proveedorForm.reset();
  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      cp: ['', [Validators.required, Validators.minLength(5)]],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      p_contacto: ['', Validators.required]
    });
    this.onChanges();
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      mail: this.proveedorForm.get('mail').value,
      p_contacto: this.proveedorForm.get('p_contacto').value

    };
    return saveProveedor;
  }

  onChanges(): void {
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.nombre = valor.nombre;
      this.cif = valor.cif;
      this.direccion = valor.direccion;
      this.cp = valor.cp;
      this.localidad = valor.localidad;
      this.provincia = valor.provincia;  
      this.telefono = valor.localidad;
      this.mail = valor.mail;
      this.p_contacto = valor.p_contacto;
    });
  }




}