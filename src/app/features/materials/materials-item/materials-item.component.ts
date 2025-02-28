import { Component, input, OnInit } from '@angular/core';
import { MaterialItem } from '../../../models/material-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials-item',
  templateUrl: './materials-item.component.html',
  styleUrls: ['./materials-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MaterialsItemComponent implements OnInit {
  item = input.required<MaterialItem>();
  constructor() {}

  ngOnInit() {}
}
