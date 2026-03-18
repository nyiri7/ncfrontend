import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './services/storage-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const adminCode = storageService.getItem('admin_code');
  if (adminCode) {
      console.log("asd");
    const clonedReq = req.clone({
      setHeaders: {
        'x-admin-code': adminCode
      }
    });
    return next(clonedReq);
  }
  return next(req);
};
