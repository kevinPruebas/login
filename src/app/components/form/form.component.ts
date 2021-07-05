import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import authFirebase from 'firebase/app';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() action: string;
  @ViewChild('contenido', { static: false }) contenido;

  loginForm: FormGroup;
  titleModal: string = null;
  messageModal: string = null;



  constructor(
    public auth: AngularFireAuth,
    private modal: NgbModal) { }


  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  loginWith() {
    this.auth.signInWithPopup(new authFirebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.auth.signOut();
  }

  customLogin() {
    this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
      })
      .catch((error) => {
        this.openWindow(error);
      });

  }

  openWindow(error) {
    if (error.code === 'auth/user-not-found') {
      this.titleModal = "Usuario no encontrado";
      this.messageModal = "No hay registro de usuario, por favor contacte al administrador.";
    }else if (error.code === 'auth/wrong-password') {
      this.titleModal = "Credenciales incorrectas";
      this.messageModal = "La contraseña  o usuario no es válido";
    }else {
      this.titleModal = "Error";
      this.messageModal = "Por favor contacte al administrador.";
    }
    this.modal.open(this.contenido, { windowClass: 'oscuro' });
  }





}
