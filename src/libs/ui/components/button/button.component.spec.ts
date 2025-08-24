import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    component.label = 'Test Button';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Test Button');
  });

  it('should apply correct variant classes', () => {
    component.variant = 'secondary';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('navega-button--secondary');
  });

  it('should apply correct size classes', () => {
    component.size = 'large';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('navega-button--large');
  });

  it('should be disabled when disabled property is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
    expect(buttonElement.nativeElement.classList).toContain('navega-button--disabled');
  });

  it('should show loading state', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('.navega-button__spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should emit clicked event when not disabled or loading', () => {
    spyOn(component.clicked, 'emit');
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    spyOn(component.clicked, 'emit');
    component.loading = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should apply full width class when fullWidth is true', () => {
    component.fullWidth = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('navega-button--full-width');
  });

  it('should show left icon when iconLeft is provided', () => {
    component.iconLeft = 'fa fa-user';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.navega-button__icon--left i'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.classList).toContain('fa');
    expect(iconElement.nativeElement.classList).toContain('fa-user');
  });

  it('should show right icon when iconRight is provided', () => {
    component.iconRight = 'fa fa-arrow-right';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.navega-button__icon--right i'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.classList).toContain('fa');
    expect(iconElement.nativeElement.classList).toContain('fa-arrow-right');
  });

  it('should have correct button type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.type).toBe('submit');
  });
});
