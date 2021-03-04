import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { CapsulesFind, CapsuleMission, Capsule } from "./interfaces";
const SPACEX_API = "https://api.spacex.land/rest";

export class SpaceXAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SPACEX_API;
  }

  async getCapsules(): Promise<Capsule[]> {
    const res = await this.get("/capsules");
    return res;
  }

  async getCapsuleById(id: string): Promise<Capsule> {
    const res = await this.get(`/capsule/${id}`, id);
    return res;
  }
}
