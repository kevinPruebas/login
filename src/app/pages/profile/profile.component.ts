import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
}) 
export class ProfileComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter();

  nombre:string;
  today :any;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit() {
    this.today = Date.now();
  }

  logout(){
    this.logoutEvent.emit();

  }
}
