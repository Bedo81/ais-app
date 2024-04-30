import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
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
    // this.searchForm = new FormGroup({
    //   searchText: new FormControl(this.initialValues?.searchText || ''),
    //   country: new FormControl(this.initialValues?.country || '')
    // });
    this.searchForm = this.fb.group({
      searchText: [this.initialValues?.searchText || ''],
      country: [this.initialValues?.country || '']
    });
  }


  onSubmit() {
    this.formSubmitted.emit(this.searchForm.value);
  }
}

