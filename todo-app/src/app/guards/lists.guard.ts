import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StateService } from "../services/state.service";

@Injectable({
  providedIn: 'root'
})
export class ListsGuard implements CanActivate {

  constructor(private stateService: StateService,
              private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const lists = await firstValueFrom(this.stateService.getAllLists());

    if (lists.length === 0) {
      return this.router.createUrlTree(['lists', -1, 'edit']);
    }

    return true;
  }

}
