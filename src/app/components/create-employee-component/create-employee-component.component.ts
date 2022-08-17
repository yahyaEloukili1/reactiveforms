import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators, FormArray } from "@angular/forms";

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
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    })
    this.employeeForm.valueChanges.subscribe(data=>{
      this.logValidationErrors()
    })
  }
  addSkillButtonClick(): void{

   (<FormArray> this.employeeForm.get('skills')).push(this.addSkillFormGroup());
 
  }
  addSkillFormGroup():FormGroup{
    return  this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['',Validators.required],
      proficiency: ['',Validators.required]
    })
  }
  onSubmit(){
    this.submitted = true
     this.logValidationErrors()
     console.log('rrrrrrrrrrrrrrr')
  
  }
  logValidationErrors(group:FormGroup = this.employeeForm){
    Object.keys(group.controls).forEach((key:string) => {
    const abstractControl = group.get(key);
    if(abstractControl instanceof FormGroup){
      this.logValidationErrors(abstractControl)
    }
    else if(abstractControl instanceof FormArray){
      for(const control of abstractControl.controls){
        if(control instanceof FormGroup){
          this.logValidationErrors(control)
        }
      }
     
    }
    else{
      this.formErrors[key] = ''
      if(abstractControl && !abstractControl.valid && 
        (abstractControl.touched || abstractControl.dirty ||this.submitted)){
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
    const formArray1 = new FormArray([
      new FormControl('John',Validators.required),
      new FormGroup({
        country: new FormControl('',Validators.required)
      }),
      new FormArray([])
    ])
    const formArray2 = this.fb.array([
      new FormControl('John',Validators.required),
      new FormControl('IT',Validators.required),
      new FormControl('',Validators.required)
    ])
    console.log(formArray1.value)
  }
  
}
