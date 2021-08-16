export const BACKEND_DEV_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3003'
        : process.env.REACT_APP_BACKEND_URL;
