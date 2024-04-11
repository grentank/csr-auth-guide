import axiosInstance from './instance';

export function loadPosts() {
  return axiosInstance('/posts').then((res) => res.data);
}
