export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'other' | 'prefer-not-to-say';
  country: string;
  region: string;
  languages: string[];
  maritalStatus: string;
  profession: string;
  bio: string;
  avatarUrl: string;
  photos: string[];
  intentions: string[];
  interests: string[];
  geographicPreference: string;
  accountPurpose: string;
  accountType: string;
  privacySettings: PrivacySettings;
  isVerified: boolean;
  compatibilityScore?: number;
  whyConnect?: string[];
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'connections' | 'private';
  searchVisibility: boolean;
  locationVisibility: boolean;
  whoCanSendIntroductions: 'everyone' | 'verified' | 'nobody';
  momentVisibility: 'public' | 'connections' | 'private';
  internationalVisibility: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DiscoverUser {
  id: string;
  displayName: string;
  age: number;
  country: string;
  avatarUrl: string;
  intentions: string[];
  interests: string[];
  isVerified: boolean;
  compatibilityScore: number;
  whyConnect: string[];
  bio: string;
}

export interface CompatibilityResult {
  score: number;
  breakdown: CompatibilityBreakdown;
  reasons: string[];
}

export interface CompatibilityBreakdown {
  intentions: number;
  geography: number;
  interests: number;
  lifestyle: number;
  languages: number;
  distance: number;
  other: number;
}

export interface IntroductionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'maybe_later';
  fromUser?: DiscoverUser;
  toUser?: DiscoverUser;
  createdAt: string;
}

export interface Connection {
  id: string;
  connectionId: string;
  user1Id: string;
  user2Id: string;
  user1?: Profile;
  user2?: Profile;
  compatibilityScore: number;
  sharedInterests: string[];
  status: 'discovered' | 'introduction' | 'accepted' | 'connection' | 'shared_experience';
  journey: ConnectionJourneyStep[];
  createdAt: string;
  acceptedAt?: string;
}

export interface ConnectionJourneyStep {
  step: string;
  label: string;
  completed: boolean;
  date?: string;
}

export interface Moment {
  id: string;
  authorId: string;
  author?: Profile;
  caption: string;
  imageUrl?: string;
  category: string;
  likesCount: number;
  commentsCount: number;
  reactionsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  author?: Profile;
  content: string;
  createdAt: string;
}

export interface Reaction {
  id: string;
  userId: string;
  type: 'like' | 'love' | 'inspire' | 'celebrate';
  momentId: string;
}

export interface Experience {
  id: string;
  providerId: string;
  provider?: Profile;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  location: string;
  isOnline: boolean;
  availability: Availability[];
}

export interface Availability {
  id: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  experienceId: string;
  experience?: Experience;
  userId: string;
  user?: Profile;
  providerId: string;
  provider?: Profile;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentAmount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  experienceId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  category: string;
  reason: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'rejected';
  createdAt: string;
  reporter?: Profile;
  reported?: Profile;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface SearchFiltersState {
  country: string;
  ageMin: number;
  ageMax: number;
  gender: string;
  intention: string;
  language: string;
  interests: string[];
  sortBy: string;
}

export interface AdminDashboard {
  totalUsers: number;
  activeUsers: number;
  totalConnections: number;
  totalBookings: number;
  pendingReports: number;
  verifiedUsers: number;
  usersByCountry: { country: string; count: number }[];
  registrationTrends: { date: string; count: number }[];
  recentActivity: { type: string; description: string; date: string }[];
}
