import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

class AppService {
  #accessToken;

  constructor(client) {
    this.client = client;
    this.#accessToken = '';

    this.useInterceptors();
  }

  useInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${this.#accessToken}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          await this.refresh();
          prevRequest.sent = true;
          prevRequest.headers.Authorization = `Bearer ${this.#accessToken}`;
          return this.client(prevRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  async refresh() {
    const res = await axios('/api/tokens/refresh');
    const { accessToken } = res.data;
    this.#accessToken = accessToken;
    return res.data.user;
  }

  async signup(formData) {
    const res = await this.client.post('/auth/signup', formData);
    this.#accessToken = res.data.accessToken;
    return res.data.user;
  }

  async login(formData) {
    const res = await this.client.post('/auth/login', formData);
    this.#accessToken = res.data.accessToken;
    return res.data.user;
  }

  logout() {
    this.#accessToken = '';
    return this.client('/auth/logout');
  }

  loadPosts = () => this.client('/posts').then((res) => res.data);

  loadAccountPosts = () => this.client('/posts/personal').then((res) => res.data);

  loadOnePost = ({ params }) => this.client(`/posts/${params.postId}`).then((res) => res.data);

  deletePost(postId) {
    return this.client.delete(`/posts/${postId}`);
  }

  createPost(formData) {
    return this.client.post('/posts', formData).then((res) => res.data);
  }
}

const appService = new AppService(axiosInstance);

export default appService;
