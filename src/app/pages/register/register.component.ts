import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import authFirebase from 'firebase/app';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('contenido', { static: false }) contenido;
  registerForm: FormGroup;
  titleModal: string = null;
  messageModal: string = null;


  constructor(public auth: AngularFireAuth, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register() {
    this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      .then((user) => {
        this.updateName();
      })
      .catch((error) => {
      });
  }

  updateName() {

    this.auth.onAuthStateChanged((user) => {
      let username = this.registerForm.value.name;
      user.updateProfile({
        displayName: username,
      }).then(() => {
        this.openWindow();
      }).catch((error) => {
      });
    });

  }

  openWindow() {
    this.titleModal = "Registro exitoso";
    this.messageModal = "El usuario se ha registrado gracias por tu tiempo.";
    this.modal.open(this.contenido, { windowClass: 'oscuro' });
  }

  accept() {
    this.modal.dismissAll();
    this.router.navigate(['profile']);
  }


}
