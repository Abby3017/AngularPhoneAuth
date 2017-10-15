import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormArray } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  user: FormGroup;
  col: any;
  UserCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;
  constructor(private afs:AngularFirestore) { 
    // this.col = afs.collection('users');
    this.UserCollectionRef = afs.collection('users');
    this.user$ = this.UserCollectionRef.valueChanges();   //to get updated value when data changes
    console.log(this.UserCollectionRef);
  }

  ngOnInit() {
    let langs: FormArray = new FormArray([]);
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      langs:langs,
      account: new FormGroup({
        email: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required) // can pass initial value to each formcontrol
      })
    });
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    this.UserCollectionRef.add(value);
  }

  addLang(lang?: string):void {
    let langName = lang ? lang:'';
    (<FormArray>this.user.controls['langs']).push(
      new FormGroup({
        langName: new FormControl(langName, Validators.required),
      })
    )
  }

}


export interface User {
  name: string;
  lang:string[];
  // address: {
  //   street:string;
  //   state:string;
  //   pin:string;
  // }
  account: {
    email: string;
    confirm: string;
  }
}