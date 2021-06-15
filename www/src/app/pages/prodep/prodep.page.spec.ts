import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdepPage } from './prodep.page';

describe('ProdepPage', () => {
  let component: ProdepPage;
  let fixture: ComponentFixture<ProdepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
