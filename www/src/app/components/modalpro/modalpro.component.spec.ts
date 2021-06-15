import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalproComponent } from './modalpro.component';

describe('ModalproComponent', () => {
  let component: ModalproComponent;
  let fixture: ComponentFixture<ModalproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalproComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
