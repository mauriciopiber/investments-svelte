import type { WithId } from "mongodb";

export interface Profile {
  email: string;
  name: string;
}

export type ProfileWithId = WithId<Profile>;
