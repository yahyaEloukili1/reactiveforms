import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators } from "@angular/forms";

@Component({
  selector: 'app-create-employee-component',
  templateUrl: './create-employee-component.component.html',
  styleUrls: ['./create-employee-component.component.css']
})
export class CreateEmployeeComponentComponent implements OnInit {
employeeForm: FormGroup
fullnamelength = 0
submitted = false;
formErrors = {
  'fullName': '',
  'email': '',
  'skillName': '',
  'experienceInYears': '',
  'proficiency': ''
};
validationMessages = {
  'fullName': {
    'required': 'Full Name is required.',
    'minlength': 'Full Name must be greater than 2 characters.',
    'maxlength': 'Full Name must be less than 10 characters.'
  },
  'email': {
    'required': 'Email is required.'
  },
  'skillName': {
    'required': 'Skill Name is required.',
  },
  'experienceInYears': {
    'required': 'Experience is required.',
  },
  'proficiency': {
    'required': 'Proficiency is required.',
  },
};
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      email: ['',Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['',Validators.required],
        proficiency: ['',Validators.required]
      })
    })
    this.employeeForm.valueChanges.subscribe(data=>{
      this.logValidationErrors()
    })
  }
  onSubmit(){
    this.submitted = true
    this.logValidationErrors()

    console.log(this.formErrors)
  }
  logValidationErrors(group:FormGroup = this.employeeForm){
    Object.keys(group.controls).forEach((key:string) => {
    const abstractControl = group.get(key);
    if(abstractControl instanceof FormGroup){
      this.logValidationErrors(abstractControl)
    }else{
      this.formErrors[key] = ''
      if(abstractControl && !abstractControl.valid && 
        (abstractControl.touched || abstractControl.dirty||this.submitted)){
           const messages = this.validationMessages[key]
      for(const errorKey in abstractControl.errors){
        if(errorKey){
          this.formErrors[key]+=messages[errorKey] + '';
        }
      }
      }
    }
  });
  }
  onLoadDataClick(){
  console.log(this.formErrors)
  }
  
}
