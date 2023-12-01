import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidatorsForm from 'src/app/helpers/ValidatorsForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string= "password";
  isText:boolean = false;
  eyeIcon: string ="fa-eye-slash";
  SignupForm!:FormGroup
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.SignupForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
     
    })
  }

  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit(){
    if(this.SignupForm.valid){
      
      console.log(this.SignupForm.value);
      // send the object to the database
      this.auth.signup(this.SignupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.SignupForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })

      
    }
    else{

      ValidatorsForm.validateAllFormFilelds(this.SignupForm);
      alert(" this form is invalid ")
      //console.log("this form is not valid");
      //throw the error using toaster and with required fields

    }
  }

  // private validateAllFormFilelds(formgroup: FormGroup){
  //   Object.keys(formgroup.controls).forEach(field =>{
  //     const control = formgroup.get(field);
  //     if(control instanceof FormControl) {
  //       control.markAsDirty({onlySelf:true});
  //     }else if( control instanceof FormGroup) {
  //       this.validateAllFormFilelds(control)
  //     }

  //   })
  // }

}
