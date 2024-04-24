import { APP_INITIALIZER, enableProdMode, LOCALE_ID } from '@angular/core'

import { environment } from './environments/environment'
import { AppComponent } from './app/app.component'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AuthInterceptorService } from './app/core/interceptors/auth-interceptor.service'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ActivatedRouteSnapshot, provideRouter } from '@angular/router'
import { appRoutes } from './app/app.routes'
import { provideStore } from '@ngrx/store'
import { registerLocaleData } from '@angular/common'
import localeUk from '@angular/common/locales/uk'
import { AuthService } from './app/core/services/auth.service'

registerLocaleData(localeUk)

if (environment.production) {
  enableProdMode()
}

const initUser = (authService: AuthService) => async () => authService.autoLogIn()

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initUser,
      deps: [AuthService],
      multi: true
    },
    provideRouter(appRoutes),
    provideStore({}),
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot) => (window.location.href = route.data['externalUrl'])
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'uk' },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
}).catch((err) => console.error(err))
