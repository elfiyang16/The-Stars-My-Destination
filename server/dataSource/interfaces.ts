export interface Capsule {
  id: string;
  landings: number;
  missions: [CapsuleMission];
  original_launch: string;
  reuse_count: number;
  status: string;
  type: string;
  dragon: Dragon;
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

export interface Mission {
  description: string;
  id: string;
  manufacturers: [string];
  name: string;
  twitter: string;
  website: string;
  wikipedia: string;
}

export interface MissionsFind {
  id: string;
  manufacturer: string;
  name: string;
  payload_id: string;
}

export interface Dragon {
  active: boolean;
  crew_capacity: number;
  description: string;
  diameter: Distance;
  dry_mass_kg: number;
  dry_mass_lb: number;
  first_flight: string;
  height_w_trunk: Distance;
  id: string;
  launch_payload_mass: Mass;
  launch_payload_vol: Volume;
  name: string;
  orbit_duration_yr: number;
  return_payload_mass: Mass;
  return_payload_vol: Volume;
  sidewall_angle_deg: number;
  type: string;
  wikipedia: string;
}

export interface Result {
  totalCount: number;
}
export interface Address {
  address: string;
  city: string;
  state: string;
}
export interface Distance {
  feet: number;
  meters: number;
}
export interface Force {
  kN: number;
  lbf: number;
}
export interface Link {
  article: string;
  reddit: string;
  wikipedia: string;
}
export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  region: string;
}
export interface Mass {
  kg: number;
  lb: number;
}
export interface Volume {
  cubic_feet: number;
  cubic_meters: number;
}
