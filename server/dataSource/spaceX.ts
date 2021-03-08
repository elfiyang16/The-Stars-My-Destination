import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { off } from "process";
import {
  CapsulesFind,
  CapsuleMission,
  Capsule,
  Mission,
  Dragon,
  MissionsFind,
} from "./interfaces";
const SPACEX_API = "https://api.spacex.land/rest";

export class SpaceXAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SPACEX_API;
  }

  async getCapsules(): Promise<Capsule[]> {
    const res = await this.get("/capsules");
    // for now rest can only fetch id field of dragon
    // res.dragon.id
    return res;
  }

  async getCapsuleById(id: string): Promise<Capsule> {
    const res = await this.get(`/capsule/${id}`, id);
    return res;
  }

  async getMissions(args: {
    find?: MissionsFind;
    limit?: { limit: number };
    offset?: { offset: number };
  }): Promise<Capsule[]> {
    const { find, limit, offset } = args;
    const res = await this.get("/missions", {
      // eslint-disable-next-line @typescript-eslint/ban-types
      ...(limit as {}),
      ...offset,
      ...find,
    });
    return res;
  }

  async getMissionById(id: string): Promise<Mission> {
    const res = await this.get(`/mission/${id}`, id);
    return res;
  }

  async getDragons(args: {
    limit?: { limit: number };
    offset?: { offset: number };
  }): Promise<Dragon[]> {
    const { limit, offset } = args;
    const res = await this.get("/dragons", {
      // eslint-disable-next-line @typescript-eslint/ban-types
      // ...(limit as {}),
      ...limit,
      ...offset,
    });
    return res;
  }

  async getDragonById(id: string): Promise<Dragon> {
    const res = await this.get(`/dragon/${id}`, id);
    return res;
  }
}
