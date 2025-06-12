export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    CHECK_AUTH: '/auth/check-auth',
  },

  USERS: {
    GET_ALL: '/users',
    CREATE: '/users',
    UPDATE: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
  },
  DEPARTMENTS: {
    GET_ALL: '/departments',
    GET_BY_ID: (id: string) => `/departments/${id}`,
  },
};
