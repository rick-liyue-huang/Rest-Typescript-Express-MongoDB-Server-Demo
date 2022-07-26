import axios from 'axios';

/**
 * @define
 * @param url
 * @param headers
 */
export const fetcher = <T>(url: string, headers = {}): Promise<T> => {
  return axios
    .get<T>(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);
};
