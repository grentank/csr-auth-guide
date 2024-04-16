import axiosInstance from './instance';

export function loadPosts() {
  return axiosInstance('/posts').then((res) => res.data);
}

export function loadAccountPosts() {
  return axiosInstance('/posts/personal').then((res) => res.data);
}

export function loadOnePost({ params }) {
  return axiosInstance(`/posts/${params.postId}`).then((res) => res.data);
}
