import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finance',
  templateUrl: './finance.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
})
export class FinanceComponent implements OnInit {
    selectedFiles: { [key: string]: File } = {};    
    filename='None'
 photo:any
    cv: any;
    filenamee='None';
  horizontalStepperForm: UntypedFormGroup;
item: any;

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        language: ['', Validators.required],
        contractType: [''],
       file:['', Validators.required]
      }),
      step2: this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        about: ['']
      }),
      step3: this._formBuilder.group({
        byEmail: this._formBuilder.group({
          companyNews: [false],
          featuredProducts: [false],
          messages: [false]
        }),
        pushNotifications: ['everything', Validators.required]
      })
    });
  }

  resetForm(): void {
    this.horizontalStepperForm.reset();
  }

  onSubmit(): void {
    // Process the form submission
    console.log(this.horizontalStepperForm.value);
  }

  handleCVUpload(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    // Handle the CV upload logic
  }
  

  downloadContract(): void {
    const link = document.createElement('a');
    link.href = 'assets/contract.pdf';
    link.download = 'Contract.pdf';
    link.click();
  }
  fileName:'No uploads'|any;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Change the file name as needed (e.g., prepend 'uploaded_' to the file name)
      this.fileName = 'uploaded_' + file.name;
      // Perform additional actions such as uploading the file to the server
      // For example, you can use HttpClient to upload the file to the server
      // this.uploadFile(file);
    }
  }
  onFileChangee(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
        this.selectedFiles[field] = file;
        
        this.photo=event.target.files[0]
        this.filename=event.target.files[0].name}
    
    }
    
}
