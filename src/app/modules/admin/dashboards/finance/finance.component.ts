import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  filename = 'None';
  photo: any;
  cv: any;
  contractFileName = 'None';
  certificationFileName = 'None';
  diplomaFileName = 'None';
  horizontalStepperForm: UntypedFormGroup;
  feedbackForm: FormGroup;

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    // Initialize horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        language: ['', Validators.required],
        contractType: [''],
        file: [''],
      }),
      step2: this._formBuilder.group({
        Username: [''],
        Poste: [''],
        Société: [''],
        about: [''],
      }),
      step3: this._formBuilder.group({
        accountActivated: ['activated', Validators.required],
        remoteWork: [false],
        onSiteWork: [false],
        workHours: ['', Validators.required],
        documentSubmission: ['upTo3DaysBefore', Validators.required],
        idCardApplication: [false],
        motorizedParking: [false],
        emergencyContact: ['', Validators.required],
      }),
    });

    // Initialize feedback form
    this.feedbackForm = this._formBuilder.group({
      onboardingRating: ['', Validators.required],
      positiveFeedback: [''],
      improvementsFeedback: [''],
      adviceFeedback: [''],
    });
  }

  onSubmitFeedback(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      console.log('Feedback submitted: ', feedbackData);
      alert('Félicitations ! Vous avez terminé le processus d\'onboarding.');
      // Here you can submit the feedbackData to a backend or service
      // e.g., this.feedbackService.submitFeedback(feedbackData);
    } else {
      console.log('Veuillez remplir tous les champs nécessaires.');
    }
  }

  resetForm(): void {
    // Reset feedback form
    this.feedbackForm.reset();
  }
 
  onSubmit(): void {
    // Process the form submission
    console.log(this.horizontalStepperForm.value);
  }

  handleFileUpload(event: any, type: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[type] = file;
      switch (type) {
        case 'cv':
          this.cv = file;
          this.contractFileName = file.name;
          break;
        case 'certification':
          this.certificationFileName = file.name;
          break;
        case 'diploma':
          this.diplomaFileName = file.name;
          break;
        default:
          console.error('Unknown file type');
      }

      console.log(`${type} uploaded:`, file.name);
    }
  }

  downloadContract(): void {
    // Define the path to the contract file (ensure it's available in your Angular project's assets folder)
    const fileUrl = 'assets/contract.pdf';
  
    // Create an anchor element dynamically
    const link = document.createElement('a');
    link.href = fileUrl; // The path to the contract file
    link.target = '_blank'; // Open in a new tab (optional)
    link.download = 'Contract.pdf'; // Set the default file name for download
  
    // Trigger the download by programmatically clicking the anchor element
    link.click();
  
    // Clean up the dynamically created element
    link.remove();
  }

  resetFile(type: string): void {
    this.selectedFiles[type] = null;
    switch (type) {
      case 'cv':
        this.contractFileName = 'None';
        break;
      case 'certification':
        this.certificationFileName = 'None';
        break;
      case 'diploma':
        this.diplomaFileName = 'None';
        break;
      default:
        console.error('Unknown file type');
    }
    console.log(`${type} reset`);
  }
}
