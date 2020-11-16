import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  @ViewChild('formpro', { static: false }) formpro: NgForm;
  proveedor: any;
  proveedorForm: FormGroup;


  localidad: any;
  nombre: any;
  cif: any;
  cp: any = 0;
  telefono: any;
  mail: any;
  direccion: any;
  p_contacto: any;
  provincia:any;
  router:any;

  // provincias = [
  //   {provincia:"Álava"},
  //   {provincia:"Asdsad"},
  //   {provincia:"Asdsad"}

  // ]

  provincias = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra',
    'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
    'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

  constructor(private pf: FormBuilder,
    private proveedorService: ProveedoresService) {
      
  }


  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedor(this.proveedor)
      .subscribe(newpres => {
      })
    this.proveedorForm.reset();
    this.router.navigate(['/proveedores']);
  }


  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      cif: ['', Validators.required],
      cp: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      p_contacto: ['', Validators.required],

    });
    this.onChanges();
  }




  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      provincia: this.proveedorForm.get('provincia').value,
      localidad: this.proveedorForm.get('localidad').value,
      cif: this.proveedorForm.get('cif').value,
      cp: this.proveedorForm.get('cp').value,
      telefono: this.proveedorForm.get('telefono').value,
      mail: this.proveedorForm.get('mail').value,
      direccion: this.proveedorForm.get('direccion').value,
      p_contacto: this.proveedorForm.get('p_contacto').value
    };
    return saveProveedor;
    
  }

  onChanges(): void {
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.nombre = valor.nombre;
      this.provincia = valor.provincia;
      this.localidad = valor.localidad;
      this.cif = valor.cif;
      this.cp = valor.cp;
      this.telefono = valor.telefono;
      this.mail = valor.mail;
      this.direccion = valor.direccion;
      this.p_contacto = valor.p_contacto;
    });
  }
}
