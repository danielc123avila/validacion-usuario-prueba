import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() cedula: string = '';

  registerForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = false;
  errorMessage = '';
  showOtroCiudad = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ciudad: ['', Validators.required],
      otraCiudad: [''],
      foto: ['']
    });
  }

  ngOnInit() {
    if (this.cedula) {
      this.registerForm.patchValue({ cedula: this.cedula });
    }
  }

  onCiudadChange(event: any) {
    this.showOtroCiudad = event.target.value === 'Otro';
    if (this.showOtroCiudad) {
      this.registerForm.get('otraCiudad')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('otraCiudad')?.clearValidators();
    }
    this.registerForm.get('otraCiudad')?.updateValueAndValidity();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Por favor selecciona una imagen válida';
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'La imagen es muy grande. Máximo 5MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.registerForm.patchValue({ foto: reader.result });
        this.errorMessage = '';
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Por favor completa todos los campos requeridos';
      return;
    }

    if (!this.previewUrl) {
      this.errorMessage = 'La foto es obligatoria';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const formData = { ...this.registerForm.value };

      // Si seleccionó "Otro", usar el valor de otraCiudad
      if (formData.ciudad === 'Otro') {
        formData.ciudad = formData.otraCiudad;
      }

      // Remover otraCiudad del objeto final
      delete formData.otraCiudad;

      const result = await this.api.registerUser(formData);

      if (result) {
        alert('Usuario registrado correctamente.');
        this.enviarWhatsApp();
      } else {
        this.errorMessage = 'Error al registrar usuario.';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al registrar usuario.';
    } finally {
      this.isLoading = false;
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  enviarWhatsApp() {
    const formData = this.registerForm.value;
    const ciudad = formData.ciudad === 'Otro' ? formData.otraCiudad : formData.ciudad;

    const mensaje = `Hola, mis datos son:
Cédula: ${formData.cedula}
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Ciudad: ${ciudad}
Foto: [Imagen adjunta]`;

    const numeroWhatsApp = "+573001234567";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}
