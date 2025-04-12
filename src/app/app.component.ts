import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  trips :any = [{start:'Banglore',end:'Chennai'},{start:'Chennai',end:'Banglore'},{start:'Ooty',end:'Chennai'}];
  visuals: any[] = [];
  addtripdeils:any = FormGroup

  constructor(){
    this.addtripdeils = new FormGroup({
      start_point: new FormControl(''),
      end_point: new FormControl(''),
    })
    this.renderTrips();
  }


  //Add Trip 
  addTrip() {
    this.trips.push({ start: this.addtripdeils.value.start_point, end: this.addtripdeils.value.end_point});
    this.addtripdeils.reset();
  }
   
  abbreviate(city: string): string {
    return city.slice(0, 3).toUpperCase();
  }
  
  //Clear Trip
  clearTrip(){
    this.trips = [];
    this.addtripdeils.reset();
    this.visuals = [];
  }
  
  //Visualize the trip
  renderTrips() {
    this.visuals = [];
    const level1Y = 100;
    const level2Y = 180;
    const stepX = 150;
    let currX = 50;

    for (let i = 0; i < this.trips.length; i++) {

      const curr = this.trips[i];
      const next = this.trips[i + 1];

      const isContinued = next && this.abbreviate(curr.end)  === this.abbreviate(next.start);  //Continued trip
      const isRepeated = i > 0 && this.abbreviate(curr.start) === this.abbreviate(this.trips[i - 1].start) && this.abbreviate(curr.end) === this.abbreviate(this.trips[i - 1].end); //Repeated trip

      if (isRepeated) {
        this.visuals.push({
          type: 'line',
          text: `${this.abbreviate(curr.start)} - ${this.abbreviate(curr.end)}` + ' (Level 2)',
          x1: currX,
          y1: level1Y,
          x2: currX + stepX,
          y2: level1Y
        });
      } else if (isContinued) {
        this.visuals.push({
          type: 'line',
          text: `${this.abbreviate(curr.start)} - ${this.abbreviate(curr.end)}` + ' (Level 1)',
          x1: currX,
          y1: level1Y,
          x2: currX + stepX,
          y2: level1Y
        });
      } else {
        this.visuals.push({
          type: 'arrow',
          text: `${this.abbreviate(curr.start)} - ${this.abbreviate(curr.end)}` + ' (Level 1)',
          x1: currX,
          y1: level1Y,
          x2: currX + stepX,
          y2: level1Y
        });
      }

      console.log(this.visuals)

      currX += stepX;
    }
  }
  
}
