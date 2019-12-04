import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetDetailsViewComponent } from './sheet-details-view.component';

describe('SheetDetailsViewComponent', () => {
  let component: SheetDetailsViewComponent;
  let fixture: ComponentFixture<SheetDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
