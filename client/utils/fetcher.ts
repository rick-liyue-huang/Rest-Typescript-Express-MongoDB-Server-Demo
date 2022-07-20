import axios from 'axios';

export const fetcher = <T>(url: string, headers = {}): Promise<T> =>
  axios
    .get<T>(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);
