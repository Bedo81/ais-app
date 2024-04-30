import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SearchFormComponent } from '../components/search-form/search-form.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SearchFormComponent],
})
export class Tab1Page {
  initialValues = {}

  constructor(private route: ActivatedRoute) {
    this.initializeFormValues();
  }

  initializeFormValues() {
    this.route.queryParams.subscribe(params => {
      this.initialValues = {
        searchText: params['searchText'] || '',
        country: params['country'] || ''
      };
      console.log('Initial Values:', this.initialValues);
      // Emit these values to the child component if needed or use directly
    });
  }

  handleFormValues(values: any) {
    console.log('Form values:', values);
  }
}
