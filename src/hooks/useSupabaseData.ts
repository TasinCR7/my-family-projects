import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase.from('members').select('*');
      if (error) {
        console.error('Error fetching members:', error);
      } else {
        // Map snake_case to camelCase
        setMembers(data.map(m => ({
          id: m.id.toString(),
          name: m.name,
          nameEn: m.name_en,
          relation: m.relation,
          age: m.birth_year ? (new Date().getFullYear() - parseInt(m.birth_year)) : 0,
          phone: m.phone,
          email: m.email,
          avatar: '',
          successRate: m.score || 0,
          tasksCompleted: 0, 
          tasksTotal: 10,
          parentId: m.parent_id?.toString(),
        })));
      }
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return { members, loading };
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      const { data, error } = await supabase.from('expenses').select('*');
      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setExpenses(data.map(e => ({
          id: e.id.toString(),
          amount: parseFloat(e.amount),
          date: e.date,
          category: e.category,
          paidBy: e.member_id?.toString(),
          description: e.description,
        })));
      }
      setLoading(false);
    }
    fetchExpenses();
  }, []);

  return { expenses, loading };
}

export function usePlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        setPlans(data.map(p => ({
          id: p.id.toString(),
          title: p.title,
          assignedTo: p.member_id?.toString(),
          startDate: p.created_at?.split('T')[0],
          deadline: p.deadline,
          category: p.priority || 'মাঝারি',
          status: p.status === 'সম্পন্ন' ? 'completed' : p.status === 'চলমান' ? 'in-progress' : 'pending',
        })));
      }
      setLoading(false);
    }
    fetchPlans();
  }, []);

  return { plans, loading };
}

export function useGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase.from('gallery').select('*');
      if (error) {
        console.error('Error fetching gallery:', error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

  return { images, loading };
}

export function useVault() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVault() {
      const { data, error } = await supabase.from('vault').select('*');
      if (error) {
        console.error('Error fetching vault:', error);
      } else {
        setDocuments(data || []);
      }
      setLoading(false);
    }
    fetchVault();
  }, []);

  return { documents, loading };
}

export function useLandRecords() {
  const [lands, setLands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLand() {
      const { data, error } = await supabase.from('land_records').select('*');
      if (error) {
        console.error('Error fetching land:', error);
      } else {
        setLands(data.map(l => ({
          id: l.id.toString(),
          location: l.location,
          mouza: l.mouza || 'অজানা',
          dag: l.dag_no || 'নেই',
          area: l.area || 'নেই',
          value: l.value || '০',
          status: l.status === 'নিষ্পত্তি' ? 'resolved' : l.status === 'চলমান' ? 'pending' : 'partial',
          progress: l.docs_count ? (l.docs_count * 20) : 0,
        })));
      }
      setLoading(false);
    }
    fetchLand();
  }, []);

  return { lands, loading };
}

export function useNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      const { data, error } = await supabase.from('notifications').select('*').order('pinned', { ascending: false }).order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching notices:', error);
      } else {
        setNotices(data || []);
      }
      setLoading(false);
    }
    fetchNotices();
  }, []);

  return { notices, loading };
}

export function usePolls() {
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolls() {
      const { data, error } = await supabase.from('polls').select('*, poll_options(*)');
      if (error) {
        console.error('Error fetching polls:', error);
      } else {
        setPolls(data || []);
      }
      setLoading(false);
    }
    fetchPolls();
  }, []);

  return { polls, loading };
}

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return { events, loading };
}
