import { Component, ElementRef, signal, ViewChild, AfterViewInit } from '@angular/core';
import { UserModel } from '../models/user';
import { UserService } from '../services/user-service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrls: ['./info.css'],
})
export class Info implements AfterViewInit {
  @ViewChild('userChart') chartCanvas?: ElementRef<HTMLCanvasElement>;
  constructor(private userService: UserService) {}
    users: UserModel[] = [];
    fetched = signal(false);
    chart: Chart | null = null;
    colors: string[] = [];

    ngOnInit() {
        this.userService.get_Users().subscribe({
          next: (Inpusers) => {
            this.users = Inpusers;
            this.sortByMoney();
            this.colors = Array(this.users.length).fill('').map(() => this.getRandomColor());
            for (let i = 0; i < this.users.length; i++) {
              if(this.users[i].id === 'a9bee6b5-e8f3-4a19-8ef4-e340c5ed0a1c'){
                this.colors[i] = 'pink';
                this.users[i].name += ' (buzi)';
                this.users[i].money = (Number(this.users[i].money) * 0.5).toString();
              }else{
                this.colors[i] = 'blue';
                  if(i===0){
                    this.users[i].name += ' (richest)';
                }
              }
            }

            this.fetched.set(true);
            this.renderChartIfReady();
          },
          error: (error) => {   
            console.error('Error fetching users:', error);
            this.fetched.set(true);
            this.renderChartIfReady();
          }
        });
    }

    ngAfterViewInit() {
      this.renderChartIfReady();
    }

    private renderChartIfReady() {
      if (!this.fetched() || !this.users.length) {
        return;
      }
      setTimeout(() => {
        if (!this.chartCanvas) {
          console.warn('Canvas element not ready yet, retrying');
          return;
        }

        this.createChart();
      }, 0);
    }

    sortByMoney() {
      this.users.sort((a, b) => Number(b.money) - Number(a.money));
    }

    createChart() {
      const ctx = this.chartCanvas!.nativeElement.getContext('2d');
    if (!ctx){
        console.error('Failed to get canvas context');
        return
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.users.map(u => u.name),
        datasets: [{
          data: this.users.map(u => Number(u.money)),
          backgroundColor: this.colors,
          borderColor: this.colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'User Balances'
          }
        }
      }
    });
  }

  getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
}
