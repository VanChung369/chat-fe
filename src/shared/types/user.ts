export enum PresenceStatus {
  Online = "online",
  Away = "away",
  Busy = "busy",
}

export interface UserProfile {
  id: string;
  about?: string;
  phone?: string;
  avatar?: string;
  banner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPresence {
  id: string;
  status: PresenceStatus;
  statusMessage?: string;
  showOffline: boolean;
}

export interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  profile?: UserProfile;
  presence?: UserPresence;
  createdAt: string;
  updatedAt: string;
}
