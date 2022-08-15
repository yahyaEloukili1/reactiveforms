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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
      })
    })
    // this.employeeForm.valueChanges.subscribe((value:any)=>{
    //  console.log(JSON.stringify(value))
    // })
  }
  onSubmit(){
    console.log(this.employeeForm.value)
  }
  onLoadDataClick(){
    this.employeeForm.patchValue({
      fullName: 'Pragim technologies',
      email: 'Pragim technologies',
      skills: {
       skillName : 'c#',
       experienceInYears: 5,
       proficiency: 'beginner' 
      }
    })
  }
}
