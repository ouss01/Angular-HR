import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CryptoService } from 'app/modules/admin/dashboards/crypto/crypto.service';
import { EmployeeService } from 'app/services/employee.service';
import { DateTime } from 'luxon';
import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
    selector       : 'crypto',
    templateUrl    : './crypto.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    providers:[DatePipe],
    imports        : [MatSidenavModule,ReactiveFormsModule,MatCheckboxModule,MatDatepickerModule,MatNativeDateModule, NgFor, MatIconModule, NgClass, NgApexchartsModule, MatFormFieldModule, MatSelectModule, MatOptionModule, NgIf, FormsModule, MatInputModule, MatButtonModule, UpperCasePipe, DecimalPipe, CurrencyPipe],
})
export class CryptoComponent implements OnInit, OnDestroy
{
    @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
    appConfig: any;
    btcOptions: ApexOptions = {};
    data: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    watchlistChartOptions: ApexOptions = {};
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    employeeForm:any=FormGroup
    selectedFiles: { [key: string]: File } = {};    
    filename='None'
    photo:any
    cv: any;
    filenamee='None';
    employee:any;
    /**
     * Constructor
     */
    constructor( private fb:FormBuilder,private employeeservice:EmployeeService,
        private _cryptoService: CryptoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private datePipe:DatePipe
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
  
        this.employeeForm = this.fb.group({
            firstName: ['', Validators.required],
            matricule: [null, Validators.required],
            lastName: ['', Validators.required],
            employeeID: [null, Validators.required],
            date_of_birth: ['', Validators.required],
            position: ['', Validators.required],
            department: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
            startDate: ['', Validators.required],
            employmentType: ['', Validators.required],
            sanctions: ['', Validators.required],
            handicap: [''],
            salary: [null, Validators.required],
            currency: ['USD'],
            employeeCarreerHistory: ['', Validators.required],
            parentId: [null, Validators.required],
            emplacement: ['', Validators.required],
            photo: [null],
            cv: [null],
            performanceRate: [null]
        })
    
        
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Set the drawerMode and drawerOpened if 'lg' breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the data
        this._cryptoService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
    }

    /**
     * On destroy
     */
    selectedImage: any
    onCheckboxChange(event: MatCheckboxChange) {
        if (event.checked) {
          this.employeeForm.get('handicap').setValue(event.source.value);
        } else {
      
        }
      }
      
      
      
    onFileSelected(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
        const file = inputElement.files[0];
        this.previewImage(file);
        this.employeeForm.patchValue({
          image: file
        });
      }
    }
    onFileSelec(event:any) {
        this.photo=event.target.files[0]
        this.filename=event.target.files[0].name
   console .log(this.filename)
        
     
    }
  
    private previewImage(file: File): void {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    onFileChange(event: any, field: string): void {
        const file = event.target.files[0];
        if (file) {
            this.selectedFiles[field] = file;
            
            this.photo=event.target.files[0]
            this.filename=event.target.files[0].name}
        
        }
        onFileChangee(event: any, field: string): void {
            const file = event.target.files[0];
            if (file) {
                this.selectedFiles[field] = file;


        
                  this.cv=event.target.files[0]
                    this.filenamee=event.target.files[0].name}
           console .log(this.filename)
            }
            submitForm(): void {
                if (this.employeeForm.valid) {
                    const formattedDateOfBirth = this.datePipe.transform(this.employeeForm.get('date_of_birth').value, 'yyyy-MM-dd');
                    const formattedStartDate = this.datePipe.transform(this.employeeForm.get('startDate').value, 'yyyy-MM-dd');
            
                    const formData = new FormData();
                    const form = this.employeeForm.value;
            
                    Object.keys(form).forEach(key => {
                        const formValue = form[key];
                        if (key === 'date_of_birth') {
                            formData.append(key, formattedDateOfBirth);
                        } else if (key === 'startDate') {
                            formData.append(key, formattedStartDate);
                        } else if (this.selectedFiles[key]) {
                            formData.append(key, this.selectedFiles[key], this.selectedFiles[key].name);
                        } else {
                            formData.append(key, formValue);
                        }
                    });
            
                    this.employeeservice.addEmployee(formData).subscribe(
                        response => {
                            console.log('Employee added successfully:', response);
                            Swal.fire("Employee added Successfully!");
                            this.employeeForm.reset(); 
                            this.filename='';
                            this.filenamee='';
                        },
                        error => {
                            console.error('Error adding employee:', error);
                        }
                    );
                } else {
                    // Handle form validation errors
                }
            }
            updateEmployee(): void {
                const employeeId = this.employeeForm.get('employeeID')?.value; // Ensure you have the employee ID in the form
                if (employeeId) {
                  const updatedData = this.employeeForm.value; // Get the updated form data
                  
                  // Log the data to the console for inspection
                  console.log('Updated Data:', updatedData);
              
                  this.employeeservice.updateEmployee(employeeId, updatedData).subscribe(
                    (response) => {
                      console.log('Employee updated successfully:', response);
                      Swal.fire('Employee updated successfully!');
                      this.employeeForm.reset(); // Reset the form after successful update
                    },
                    (error) => {
                      console.error('Error updating employee:', error);
                      Swal.fire('Error updating employee!');
                    }
                  );
                } else {
                  Swal.fire('Please provide a valid employee ID');
                }
              }

              deleteEmployee(): void {
                const employeeId = this.employeeForm.get('employeeID')?.value;
              
                if (employeeId) {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.employeeservice.deleteEmployee(employeeId).subscribe(
                        (response) => {
                          console.log('Employee deleted successfully:', response);
                          Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
                          this.employeeForm.reset();
                        },
                        (error) => {
                          console.error('Error deleting employee:', error);
                          Swal.fire('Error', `There was an issue deleting the employee: ${error.message}`, 'error');
                        }
                      );
                    }
                  });
                } else {
                  Swal.fire('Error', 'Please provide a valid employee ID to delete.', 'error');
                }
              }
              
              
              
    
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // BTC
        this.btcOptions = {
            chart     : {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'line',
                toolbar   : {
                    show: false,
                },
                zoom      : {
                    enabled: false,
                },
            },
            colors    : ['#5A67D8'],
            dataLabels: {
                enabled: false,
            },
            grid      : {
                borderColor    : 'var(--fuse-border)',
                position       : 'back',
                show           : true,
                strokeDashArray: 6,
                xaxis          : {
                    lines: {
                        show: true,
                    },
                },
                yaxis          : {
                    lines: {
                        show: true,
                    },
                },
            },
            legend    : {
                show: false,
            },
            series    : this.data.btc.price.series,
            stroke    : {
                width: 2,
                curve: 'straight',
            },
            tooltip   : {
                shared: true,
                theme : 'dark',
                y     : {
                    formatter: (value: number): string => '$' + value.toFixed(2),
                },
            },
            xaxis     : {
                type      : 'numeric',
                crosshairs: {
                    show    : true,
                    position: 'back',
                    fill    : {
                        type : 'color',
                        color: 'var(--fuse-border)',
                    },
                    width   : 3,
                    stroke  : {
                        dashArray: 0,
                        width    : 0,
                    },
                    opacity : 0.9,
                },
                tickAmount: 8,
                axisTicks : {
                    show : true,
                    color: 'var(--fuse-border)',
                },
                axisBorder: {
                    show: false,
                },
                tooltip   : {
                    enabled: false,
                },
                labels    : {
                    show                 : true,
                    trim                 : false,
                    rotate               : 0,
                    minHeight            : 40,
                    hideOverlappingLabels: true,
                    formatter            : (value): string => DateTime.now().minus({minutes: Math.abs(parseInt(value, 10))}).toFormat('HH:mm'),
                    style                : {
                        colors: 'currentColor',
                    },
                },
            },
            yaxis     : {
                axisTicks     : {
                    show : true,
                    color: 'var(--fuse-border)',
                },
                axisBorder    : {
                    show: false,
                },
                forceNiceScale: true,
                labels        : {
                    minWidth : 40,
                    formatter: (value: number): string => '$' + value.toFixed(0),
                    style    : {
                        colors: 'currentColor',
                    },
                },
            },
        };

        // Watchlist options
        this.watchlistChartOptions = {
            chart  : {
                animations: {
                    enabled: false,
                },
                width     : '100%',
                height    : '100%',
                type      : 'line',
                sparkline : {
                    enabled: true,
                },
            },
            colors : ['#A0AEC0'],
            stroke : {
                width: 2,
                curve: 'smooth',
            },
            tooltip: {
                enabled: false,
            },
            xaxis  : {
                type: 'category',
            },
        };
    }
}