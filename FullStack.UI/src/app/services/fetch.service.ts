import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  defaults: RequestInit = {};

  constructor() { }

  async get(url: RequestInfo | URL, options: RequestInit = {}): Promise<Response & { data?: any }> {
    const defaultOptions: RequestInit = {
      method: 'GET'
    }
    let mergedOptions = this.mergeOptions(defaultOptions, this.defaults);
    mergedOptions = this.mergeOptions(mergedOptions, options);

    const resp = await fetch(url, mergedOptions);

    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.statusText})`);
    }

    return this.convertResponse(resp);
  }

  async post(url: RequestInfo | URL, body: any, options: RequestInit = {}): Promise<Response & { data?: any }> {
    const defaultOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };
    let mergedOptions = this.mergeOptions(defaultOptions, this.defaults);
    mergedOptions = this.mergeOptions(mergedOptions, options);

    if (!mergedOptions.headers.get('Content-Type')?.includes('application/json')) {
      mergedOptions.body = body;
    }
    if (mergedOptions.headers.get('Content-Type')?.includes('multipart/form-data')) {
      mergedOptions.headers.delete('Content-Type');
    }

    const resp = await fetch(url, mergedOptions);

    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.statusText})`);
    }

    return this.convertResponse(resp);
  }

  async put(url: RequestInfo | URL, body: any, options: RequestInit = {}): Promise<Response & { data?: any }> {
    const defaultOptions: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }
    let mergedOptions = this.mergeOptions(defaultOptions, this.defaults);
    mergedOptions = this.mergeOptions(mergedOptions, options);

    if (!mergedOptions.headers.get('Content-Type')?.includes('application/json')) {
      mergedOptions.body = body;
    }
    if (mergedOptions.headers.get('Content-Type')?.includes('multipart/form-data')) {
      mergedOptions.headers.delete('Content-Type');
    }

    const resp = await fetch(url, mergedOptions);

    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.statusText})`);
    }
    return this.convertResponse(resp);
  }

  async patch(url: RequestInfo | URL, body: any, options: RequestInit = {}): Promise<Response & { data?: any }> {
    const defaultOptions: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }
    let mergedOptions = this.mergeOptions(defaultOptions, this.defaults);
    mergedOptions = this.mergeOptions(mergedOptions, options);

    if (!mergedOptions.headers.get('Content-Type')?.includes('application/json')) {
      mergedOptions.body = body;
    }
    if (mergedOptions.headers.get('Content-Type')?.includes('multipart/form-data')) {
      mergedOptions.headers.delete('Content-Type');
    }

    const resp = await fetch(url, mergedOptions);

    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.statusText})`);
    }

    return this.convertResponse(resp);
  }

  async delete(url: RequestInfo | URL, options: RequestInit = {}): Promise<Response & { data?: any }> {
    const defaultOptions: RequestInit = {
      method: 'DELETE'
    }
    let mergedOptions = this.mergeOptions(defaultOptions, this.defaults);
    mergedOptions = this.mergeOptions(mergedOptions, options);

    const resp = await fetch(url, mergedOptions);

    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.statusText})`);
    }

    return this.convertResponse(resp);
  }

  mergeOptions(destination: RequestInit, source: RequestInit): RequestInit & { headers: Headers } {
    let destinationHeaders = this.convertHeaders(destination.headers);
    let sourceHeaders = this.convertHeaders(source.headers);

    sourceHeaders.forEach((value, key) => {
      destinationHeaders.set(key, value);
    });

    const merged = { ...destination, ...source, headers: destinationHeaders };

    return merged;
  }

  convertHeaders(headers?: HeadersInit): Headers {
    let convertedHeaders = new Headers();

    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        convertedHeaders.set(key, value);
      })
    } else if (Array.isArray(headers)) {
      headers.forEach(value => {
        convertedHeaders.set(value[0], value[1]);
      })
    } else if (typeof headers === 'object') {
      Object.entries(headers).forEach(([key, value]) => {
        convertedHeaders.set(key, value);
      });
    }

    return convertedHeaders;
  }

  async convertResponse(resp: Response & { data?: any }) {
    const contentType = resp.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      resp.data = await resp.json();
    }
    if (contentType?.includes('application/pdf')) {
      resp.data = await resp.arrayBuffer();
    }

    return resp;
  }
}
