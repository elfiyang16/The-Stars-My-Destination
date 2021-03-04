export interface Capsule {
  id: string;
  landings: number;
  missions: [CapsuleMission];
  original_launch: string;
  reuse_count: number;
  status: string;
  type: string;
}
export interface CapsulesFind {
  id: string;
  landings: number;
  mission: string;
  original_launch: string;
  reuse_count: number;
  status: string;
  type: string;
}
export interface CapsuleMission {
  flight: number;
  name: string;
}
