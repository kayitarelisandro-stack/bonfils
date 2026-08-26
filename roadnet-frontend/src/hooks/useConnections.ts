import { useState, useEffect, useCallback } from 'react';
import { connectionsApi } from '../api/connections';
import type { Connection, IntroductionRequest } from '../types';
import toast from 'react-hot-toast';

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sentIntroductions, setSentIntroductions] = useState<IntroductionRequest[]>([]);
  const [receivedIntroductions, setReceivedIntroductions] = useState<IntroductionRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await connectionsApi.getConnections();
      setConnections(res.data.connections);
      setTotal(res.data.total);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchIntroductions = useCallback(async () => {
    try {
      const [sent, received] = await Promise.all([
        connectionsApi.getSentIntroductions(),
        connectionsApi.getReceivedIntroductions(),
      ]);
      setSentIntroductions(sent.data);
      setReceivedIntroductions(received.data);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchConnections();
    fetchIntroductions();
  }, [fetchConnections, fetchIntroductions]);

  const sendIntroduction = async (toUserId: string, message: string) => {
    try {
      await connectionsApi.sendIntroduction(toUserId, message);
      toast.success('Introduction sent successfully!');
      await fetchIntroductions();
    } catch {
      toast.error('Failed to send introduction');
    }
  };

  const respondToIntroduction = async (id: string, status: 'accepted' | 'declined' | 'maybe_later') => {
    try {
      await connectionsApi.respondToIntroduction(id, status);
      toast.success(status === 'accepted' ? 'Introduction accepted!' : 'Response recorded');
      await fetchIntroductions();
      await fetchConnections();
    } catch {
      toast.error('Failed to respond');
    }
  };

  return {
    connections,
    sentIntroductions,
    receivedIntroductions,
    total,
    isLoading,
    sendIntroduction,
    respondToIntroduction,
    refetch: fetchConnections,
  };
}
