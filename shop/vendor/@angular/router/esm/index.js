import { RouterLink } from './directives/router_link';
import { RouterLinkActive } from './directives/router_link_active';
import { RouterOutlet } from './directives/router_outlet';
export { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RoutesRecognized } from './router';
export { RouterOutletMap } from './router_outlet_map';
export { provideRouter } from './router_providers';
export { ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from './router_state';
export { PRIMARY_OUTLET } from './shared';
export { DefaultUrlSerializer, UrlSerializer } from './url_serializer';
export { UrlPathWithParams, UrlTree } from './url_tree';
export const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkActive];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwwQkFBMEI7T0FDNUMsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlDQUFpQztPQUN6RCxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QjtBQUt2RCxTQUFlLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsUUFBTyxVQUFVLENBQUM7QUFDNUgsU0FBUSxlQUFlLFFBQU8scUJBQXFCLENBQUM7QUFDcEQsU0FBUSxhQUFhLFFBQU8sb0JBQW9CLENBQUM7QUFDakQsU0FBUSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixRQUFPLGdCQUFnQixDQUFDO0FBQ3hHLFNBQVEsY0FBYyxRQUFlLFVBQVUsQ0FBQztBQUNoRCxTQUFRLG9CQUFvQixFQUFFLGFBQWEsUUFBTyxrQkFBa0IsQ0FBQztBQUNyRSxTQUFRLGlCQUFpQixFQUFFLE9BQU8sUUFBTyxZQUFZLENBQUM7QUFFdEQsT0FBTyxNQUFNLGlCQUFpQixHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rQWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmtfYWN0aXZlJztcbmltcG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL2RpcmVjdGl2ZXMvcm91dGVyX291dGxldCc7XG5cbmV4cG9ydCB7RXh0cmFPcHRpb25zfSBmcm9tICcuL2NvbW1vbl9yb3V0ZXJfcHJvdmlkZXJzJztcbmV4cG9ydCB7Um91dGUsIFJvdXRlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuZXhwb3J0IHtDYW5BY3RpdmF0ZSwgQ2FuRGVhY3RpdmF0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmV4cG9ydCB7RXZlbnQsIE5hdmlnYXRpb25DYW5jZWwsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciwgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIsIFJvdXRlc1JlY29nbml6ZWR9IGZyb20gJy4vcm91dGVyJztcbmV4cG9ydCB7Um91dGVyT3V0bGV0TWFwfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfbWFwJztcbmV4cG9ydCB7cHJvdmlkZVJvdXRlcn0gZnJvbSAnLi9yb3V0ZXJfcHJvdmlkZXJzJztcbmV4cG9ydCB7QWN0aXZhdGVkUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90fSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5leHBvcnQge1BSSU1BUllfT1VUTEVULCBQYXJhbXN9IGZyb20gJy4vc2hhcmVkJztcbmV4cG9ydCB7RGVmYXVsdFVybFNlcmlhbGl6ZXIsIFVybFNlcmlhbGl6ZXJ9IGZyb20gJy4vdXJsX3NlcmlhbGl6ZXInO1xuZXhwb3J0IHtVcmxQYXRoV2l0aFBhcmFtcywgVXJsVHJlZX0gZnJvbSAnLi91cmxfdHJlZSc7XG5cbmV4cG9ydCBjb25zdCBST1VURVJfRElSRUNUSVZFUyA9IFtSb3V0ZXJPdXRsZXQsIFJvdXRlckxpbmssIFJvdXRlckxpbmtBY3RpdmVdOyJdfQ==