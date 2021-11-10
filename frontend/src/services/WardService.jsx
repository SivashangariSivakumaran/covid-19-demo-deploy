import http from "../http-common";

const getAll = () => {
  return http.get("/hospital/wards");
};

const get = (id) => {
  return http.get(`/hospital/wards/${id}`);
};

const create = (data) => {
  return http.post("/hospital/wards", data);
};

const update = (id, data) => {
  return http.put(`/hospital/wards/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/hospital/wards/${id}`);
};

const removeAll = () => {
  return http.delete(`/hospital/wards`);
};

const findByTitle = (ward_name) => {
  return http.get(`/hospital/wards?ward_name=${ward_name}`);
};

const WardService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default WardService;