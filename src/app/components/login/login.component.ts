import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ValidatorsForm from 'src/app/helpers/ValidatorsForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string= "password";
  isText:boolean = false;
  eyeIcon: string ="fa-eye-slash";
  loginForm!:FormGroup;
  constructor(
    private fb : FormBuilder, 
    private auth:AuthService, 
    private router:Router,
                  
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })
  }

  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){  
      console.log(this.loginForm.value);
      // send the object to the database
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log("responce for",res.message);
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error: (err) =>{
          alert("something went Wrong")
          console.log(err);
        }
      })

    }
    else{

      ValidatorsForm.validateAllFormFilelds(this.loginForm)
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
