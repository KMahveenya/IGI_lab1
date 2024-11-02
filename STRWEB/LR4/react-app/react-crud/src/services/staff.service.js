import http from "../http-common";

class StaffDataService {
  getAll() {
    return http.get("/staffs");
  }

  get(id) {
    return http.get(`/staffs/${id}`);
  }

  create(data) {
    return http.post("/staffs", data);
  }

  update(id, data) {
    return http.put(`/staffs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/staffs/${id}`);
  }

  deleteAll() {
    return http.delete(`/staffs`);
  }

}

export default new StaffDataService();