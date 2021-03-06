import Axios from 'axios';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

class HttpClient {


  get(url, config = {}) {
    return from(Axios.get(url, { ...config, ...this.fetchHeaders() }))
      .pipe(map(response => response.data))
      .toPromise();
  }

  post(url, data, config = {}) {
    return from(Axios.post(url, data, { ...config, ...this.fetchHeaders() }))
      .pipe(map(response => response.data))
      .toPromise();
  }

  put(url, data, config = {}) {
    return from(Axios.put(url, data, { ...config, ...this.fetchHeaders() }))
      .pipe(map(response => response.data))
      .toPromise();
  }

  delete(url, config = {}) {
    return from(Axios.delete(url, { ...config, ...this.fetchHeaders() }))
      .pipe(map(response => response.data))
      .toPromise();
  }

  patch(url, data, config = {}) {
    return from(Axios.patch(url, data, { ...config, ...this.fetchHeaders() }))
      .pipe(map(response => response.data))
      .toPromise();
  }
}

export default HttpClient;
