import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeContainerComponent } from './theme-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ThemeContainerComponent', () => {
  let component: ThemeContainerComponent;
  let fixture: ComponentFixture<ThemeContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ThemeContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
