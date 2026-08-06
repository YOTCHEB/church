import supabase from './supabase';

export const staffService = {
  subscribeToStaff: (callback) => {
    if (!supabase) {
      callback([]);
      return () => {};
    }
    const channel = supabase
      .channel('staff')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff' }, () => {
        staffService.getAllStaff().then(callback).catch(() => callback([]));
      })
      .subscribe();
    staffService.getAllStaff().then(callback).catch(() => callback([]));
    return () => supabase.removeChannel(channel);
  },

  getAllStaff: async () => {
    if (!supabase) return [];
    const { data, error } = await supabase.from('staff').select('*').order('sort_order');
    if (error) return [];
    return data || [];
  },

  addStaff: async (staffData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('staff').insert({ ...staffData, created_at: now, updated_at: now }).select().single();
    if (error) throw error;
    return data;
  },

  updateStaff: async (id, staffData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const { data, error } = await supabase.from('staff').update({ ...staffData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  deleteStaff: async (id) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return false;
    }
    const { error } = await supabase.from('staff').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};

export const programsService = {
  subscribeToPrograms: (callback) => {
    if (!supabase) {
      callback([]);
      return () => {};
    }
    const channel = supabase
      .channel('programs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'programs' }, () => {
        programsService.getAllPrograms().then(callback).catch(() => callback([]));
      })
      .subscribe();
    programsService.getAllPrograms().then(callback).catch(() => callback([]));
    return () => supabase.removeChannel(channel);
  },

  getAllPrograms: async (activeOnly = false) => {
    if (!supabase) return [];
    let query = supabase.from('programs').select('*').order('sort_order');
    if (activeOnly) query = query.eq('is_active', true);
    const { data, error } = await query;
    if (error) return [];
    return data || [];
  },

  addProgram: async (programData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('programs').insert({ ...programData, created_at: now, updated_at: now }).select().single();
    if (error) throw error;
    return data;
  },

  updateProgram: async (id, programData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const { data, error } = await supabase.from('programs').update({ ...programData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  deleteProgram: async (id) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return false;
    }
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};

export const donationsService = {
  subscribeToDonations: (callback) => {
    if (!supabase) {
      callback([]);
      return () => {};
    }
    const channel = supabase
      .channel('donations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => {
        donationsService.getAllDonations().then(callback).catch(() => callback([]));
      })
      .subscribe();
    donationsService.getAllDonations().then(callback).catch(() => callback([]));
    return () => supabase.removeChannel(channel);
  },

  getAllDonations: async () => {
    if (!supabase) return [];
    const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  },

  addDonation: async (donationData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('donations').insert({ ...donationData, status: 'pending', created_at: now }).select().single();
    if (error) throw error;
    return data;
  }
};

export const videosService = {
  subscribeToVideos: (callback) => {
    if (!supabase) {
      callback([]);
      return () => {};
    }
    const channel = supabase
      .channel('videos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => {
        videosService.getAllVideos().then(callback).catch(() => callback([]));
      })
      .subscribe();
    videosService.getAllVideos().then(callback).catch(() => callback([]));
    return () => supabase.removeChannel(channel);
  },

  getAllVideos: async () => {
    if (!supabase) return [];
    const { data, error } = await supabase.from('videos').select('*').order('sort_order');
    if (error) return [];
    return data || [];
  },

  addVideo: async (videoData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('videos').insert({ ...videoData, created_at: now, updated_at: now }).select().single();
    if (error) throw error;
    return data;
  },

  updateVideo: async (id, videoData) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return null;
    }
    const { data, error } = await supabase.from('videos').update({ ...videoData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  deleteVideo: async (id) => {
    if (!supabase) {
      alert('Supabase not configured. Check src/supabase.js');
      return false;
    }
    const { error } = await supabase.from('videos').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
