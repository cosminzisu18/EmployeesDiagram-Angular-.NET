import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FilterService {

  constructor() { }

  setFilter = (filter: object, path: string) => {
    const filters: object | any = sessionStorage.getItem('filters') ? JSON.parse(sessionStorage.getItem('filters') || '') : {};
    filters[path] = filter;

    sessionStorage.setItem('filters', JSON.stringify(filters));
  }

  getFilter = (path: string) => {
    const filters: object | any = sessionStorage.getItem('filters') ? JSON.parse(sessionStorage.getItem('filters') || '') : {};

    return filters[path] ? filters[path] : {};
  }
}
