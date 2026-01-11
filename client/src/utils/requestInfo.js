export default {
  origin: import.meta.env.VITE_SERVER,
  token: localStorage.getItem("jwt"),
};
