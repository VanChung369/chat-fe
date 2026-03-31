export interface UserProfile {
  id: string;
  about?: string;
  avatar?: string;
  banner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  profile?: UserProfile;
  createdAt: string;
  updatedAt: string;
}
