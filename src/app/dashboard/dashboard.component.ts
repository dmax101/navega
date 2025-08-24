import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, User } from '@navega/shared-auth';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  currentUser: User | null = null;
  private destroy$ = new Subject<void>();
  private chart: any = null;

  // Mock data
  totalContributions = 'R$ 999.999,99';
  monthlyContribution = 'R$ 499.999,99';
  voluntaryContribution = 'R$ 499.999,99';

  menuItems = [
    { icon: 'file-invoice-dollar.svg', label: 'Ver Extrato', active: false },
    { icon: 'envelope-open-dollar.svg', label: 'Contribuição Mensal', active: true },
    { icon: 'sack-dollar.svg', label: 'Contribuição Extra', active: false },
    { icon: 'file-alt.svg', label: 'Documentos', active: false },
    { icon: 'user-chart.svg', label: 'Regime de Tributação', active: false },
    { icon: 'comment-dollar.svg', label: 'Solicitar Benefício', active: false },
    { icon: 'file-chart-line.svg', label: 'Extrato Regressivo', active: false },
    { icon: 'info.svg', label: 'Informações', active: false }
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadUserData(): void {
    this.auth.getAuthState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(authState => {
        this.currentUser = authState.user;
      });
  }

  private initChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Contribuição mensal', 'Contribuição voluntária'],
        datasets: [{
          data: [499999.99, 499999.99],
          backgroundColor: [
            '#E22E6F', // Pink for monthly contribution
            '#594CBE'  // Purple for voluntary contribution
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
