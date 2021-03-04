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
    // const { id, manufacturer, name, payload_id } = find;
    console.log(find, "limit", limit, "offset", offset);
    const res = await this.get("/missions", {
      // eslint-disable-next-line @typescript-eslint/ban-types
      ...(limit as {}),
      ...offset,
      ...find,
    });
    // const res = await this.get("/missions");
    //api.spacex.land/rest/missions?id=&manufacturer=string&name=string&payload_id=string&limit=2&offset=0

    return res;
  }

  async getMissionById(id: string): Promise<Mission> {
    const res = await this.get(`/mission/${id}`, id);
    return res;
  }
}
