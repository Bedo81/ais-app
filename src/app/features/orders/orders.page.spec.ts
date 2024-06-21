import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdersPageComponent } from './orders.page';

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrdersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
