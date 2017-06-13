import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelModalComponent } from './channel-modal.component';

describe('ChannelModalComponent', () => {
  let component: ChannelModalComponent;
  let fixture: ComponentFixture<ChannelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
