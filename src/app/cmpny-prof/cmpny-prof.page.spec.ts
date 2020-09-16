import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmpnyProfPage } from './cmpny-prof.page';

describe('CmpnyProfPage', () => {
  let component: CmpnyProfPage;
  let fixture: ComponentFixture<CmpnyProfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpnyProfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmpnyProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
