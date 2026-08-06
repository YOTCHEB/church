import supabase from './supabase';

export const authService = {
  /**
   * Sign in with email and password
   */
  signIn: async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign up a new user
   */
  signUp: async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  signOut: async () => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current session
   */
  getSession: async () => {
    if (!supabase) {
      return null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  /**
   * Get current user
   */
  getUser: async () => {
    if (!supabase) {
      return null;
    }

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Reset password
   */
  resetPassword: async (email) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) throw error;
  },

  /**
   * Update user password
   */
  updatePassword: async (newPassword) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange: (callback) => {
    if (!supabase) {
      return { subscription: null, unsubscribe: () => {} };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    return {
      subscription,
      unsubscribe: () => subscription?.unsubscribe(),
    };
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async () => {
    const session = await authService.getSession();
    return !!session;
  },
};

export default authService;
