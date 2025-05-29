import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterFormComponent],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  cedulaForm: FormGroup;
  userFound: boolean | null = null;
  userData: any = null;
  isLoading = false;
  errorMessage = '';
  validatedCedula = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.cedulaForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]]
    });
  }

  async onSubmit() {
    if (this.cedulaForm.invalid) {
      this.cedulaForm.markAllAsTouched();
      this.errorMessage = 'Por favor ingresa una cédula válida (6-10 dígitos)';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.userFound = null;
    this.userData = null;

    try {
      const cedula = this.cedulaForm.value.cedula;
      this.validatedCedula = cedula;

      const result = await this.api.getUserByCedula(cedula);

      if (result) {
        this.userFound = true;
        this.userData = result;
      } else {
        this.userFound = false;
      }

    } catch (error: any) {
      this.userFound = false;
      this.errorMessage = `Error al validar usuario: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }

  // Método para continuar cuando el usuario es encontrado
  continuarProceso() {
    const userInfo = this.userData;
    const mensaje = `Hola, soy ${userInfo.nombre || 'Usuario registrado'} con cédula ${this.validatedCedula}. Usuario encontrado en el sistema, continuando con el proceso.`;

    const numeroWhatsApp = "573001234567";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  // Método para reiniciar la búsqueda
  nuevaBusqueda() {
    this.userFound = null;
    this.userData = null;
    this.errorMessage = '';
    this.validatedCedula = '';
    this.cedulaForm.reset();
  }
}
