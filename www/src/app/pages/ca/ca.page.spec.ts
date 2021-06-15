import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaPage } from './ca.page';

describe('CaPage', () => {
  let component: CaPage;
  let fixture: ComponentFixture<CaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
