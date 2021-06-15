import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdpPage } from './prodp.page';

describe('ProdpPage', () => {
  let component: ProdpPage;
  let fixture: ComponentFixture<ProdpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
