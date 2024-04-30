import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, ReactiveFormsModule, CommonModule]
})
export class SearchFormComponent {
  @Input() initialValues: any;
  @Output() formSubmitted = new EventEmitter<any>();

  countries = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
    // Add more countries as needed
  ];

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchText: [this.initialValues?.searchText || '', Validators.required],
      country: [this.initialValues?.country || '', Validators.required]
    });
    // this.searchForm = new FormGroup({
    //   searchText: new FormControl(this.initialValues?.searchText || ''),
    //   country: new FormControl(this.initialValues?.country || '')
    // });
  }


  onSubmit() {
    this.formSubmitted.emit(this.searchForm.value);
  }
}

