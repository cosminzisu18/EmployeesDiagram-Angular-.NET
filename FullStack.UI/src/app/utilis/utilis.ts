import { HttpClient } from '@angular/common/http';
import { ToastService } from '../services/toast.service';


export const cloneDeep = (obj: any) => {
  if(typeof obj !== 'object' || obj === null) {
      return obj;
  }

  if(obj instanceof Date) {
      return new Date(obj.getTime());
  }

  if(obj instanceof Array) {
      return obj.reduce((arr, item, i) => {
          arr[i] = cloneDeep(item);
          return arr;
      }, []);
  }

  if(obj instanceof Object) {
      return Object.keys(obj).reduce((newObj: any, key) => {
          newObj[key] = cloneDeep(obj[key]);
          return newObj;
      }, {})
  }
};

export const saveError = (errorMessage: string, http: HttpClient, toastService: ToastService) => {
  const errorData = {
    errorMessage: errorMessage
  };

  http.post('http://localhost:5077/api/error-logs', errorData).subscribe(
    (error) => {
      toastService.error(`${errorMessage}`);
    }
  );
};
