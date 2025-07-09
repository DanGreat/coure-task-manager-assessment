import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideToastr({
      timeOut: 4000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      closeButton: true,
    }),
  ],
};
