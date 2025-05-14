import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const req_with_headers = req.clone({
    headers: req.headers.set('Access-Control-Allow-Origin', '*')
  })
  return next(req_with_headers);
};
