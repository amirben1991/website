
import { HttpInterceptorFn } from '@angular/common/http';

function isJwtExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return false;
    // exp est en secondes depuis epoch
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  // console.log('[auth.interceptor] Token lu du localStorage:', token);

  if (token) {
    if (isJwtExpired(token)) {
      // Token expiré : suppression et requête sans Authorization
      localStorage.removeItem('auth_token');
      // console.log('[auth.interceptor] Token expiré, suppression.');
      return next(req);
    }
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log('[auth.interceptor] Requête clonée avec Authorization:', clonedRequest.headers.get('Authorization'));
    return next(clonedRequest);
  }

  // console.log('[auth.interceptor] Pas de token, requête envoyée sans Authorization.');
  return next(req);
};
