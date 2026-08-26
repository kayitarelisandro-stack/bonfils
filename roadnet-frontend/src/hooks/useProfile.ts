import { useState, useEffect, useCallback } from 'react';
import { profileApi } from '../api/profile';
import type { Profile } from '../types';
import toast from 'react-hot-toast';

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = userId ? await profileApi.getProfileById(userId) : await profileApi.getMyProfile();
      setProfile(res.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load profile';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      const res = await profileApi.updateProfile(data);
      setProfile(res.data);
      toast.success('Profile updated successfully');
      return res.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      toast.error(message);
      throw err;
    }
  };

  const uploadPhoto = async (file: File) => {
    try {
      const res = await profileApi.uploadPhoto(file);
      if (profile) {
        setProfile({ ...profile, photos: [...profile.photos, res.data.url] });
      }
      toast.success('Photo uploaded successfully');
      return res.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to upload photo';
      toast.error(message);
      throw err;
    }
  };

  return { profile, isLoading, error, updateProfile, uploadPhoto, refetch: fetchProfile };
}
