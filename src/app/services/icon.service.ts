import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'add-new',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/svg/add-new.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'list-mode',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/svg/list-mode.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'tiles-mode',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/svg/tiles-mode.svg'
      )
    );
  }
}
