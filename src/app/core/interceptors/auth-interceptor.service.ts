import { inject, Injectable } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

import { AuthService } from '../services/auth.service'
import { exhaustMap, take } from 'rxjs'
import { User } from '../models/user.model'
import { NO_TOKEN } from '../models/no-token.function'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private readonly authService = inject(AuthService)

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        if (!user || req.url.includes('/auth') || req.context.get(NO_TOKEN)) return next.handle(req)

        const newParams = req.params
        const modifiedReq = req.clone({
          params: newParams,
          headers: req.headers.set(
            'Authorization',
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiTG9naW4iOiJSU2tvbW9yb2toYSIsIklzQWN0aXZlIjoxLCJleHBpcmVfYXQiOiIyMDI0LTA1LTAxVDE0OjQwOjI1LjM2NjYyNSJ9.jwNDojFQmrzknk7k908DZUOu4mVJU3Syui55-VMWe7c`
          )
        })

        return next.handle(modifiedReq)
      })
    )
  }
}
