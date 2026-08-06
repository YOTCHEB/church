import supabase from './supabase';

/**
 * Storage Service for Supabase Storage
 * Handles file uploads to different buckets
 */
export const storageService = {
  /**
   * Upload a file to storage
   * @param {string} bucket - The bucket name (e.g., 'staff-images', 'videos')
   * @param {string} filePath - The path/filename in the bucket
   * @param {File} file - The file to upload
   * @returns {Promise<{url: string, path: string}>}
   */
  uploadFile: async (bucket, filePath, file) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Overwrite if exists
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: data.path,
    };
  },

  /**
   * Upload staff image
   * @param {File} file - The image file
   * @param {string} filename - Custom filename or generate one
   */
  uploadStaffImage: async (file, filename = null) => {
    const ext = file.name.split('.').pop();
    const fileName = filename || `staff-${Date.now()}.${ext}`;
    return await storageService.uploadFile('staff-images', fileName, file);
  },

  /**
   * Upload program image
   * @param {File} file - The image file
   * @param {string} filename - Custom filename or generate one
   */
  uploadProgramImage: async (file, filename = null) => {
    const ext = file.name.split('.').pop();
    const fileName = filename || `program-${Date.now()}.${ext}`;
    return await storageService.uploadFile('program-images', fileName, file);
  },

  /**
   * Upload video thumbnail
   * @param {File} file - The image file
   * @param {string} filename - Custom filename or generate one
   */
  uploadVideoThumbnail: async (file, filename = null) => {
    const ext = file.name.split('.').pop();
    const fileName = filename || `thumbnail-${Date.now()}.${ext}`;
    return await storageService.uploadFile('video-thumbnails', fileName, file);
  },

  /**
   * Upload video
   * @param {File} file - The video file
   * @param {string} filename - Custom filename or generate one
   */
  uploadVideo: async (file, filename = null) => {
    const ext = file.name.split('.').pop();
    const fileName = filename || `video-${Date.now()}.${ext}`;
    return await storageService.uploadFile('videos', fileName, file);
  },

  /**
   * Get public URL for a file
   * @param {string} bucket - The bucket name
   * @param {string} filePath - The file path in the bucket
   */
  getPublicUrl: (bucket, filePath) => {
    if (!supabase) return null;
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data?.publicUrl || null;
  },

  /**
   * Delete a file from storage
   * @param {string} bucket - The bucket name
   * @param {string} filePath - The file path in the bucket
   */
  deleteFile: async (bucket, filePath) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
    return true;
  },

  /**
   * List files in a bucket
   * @param {string} bucket - The bucket name
   * @param {string} folder - Optional folder path
   */
  listFiles: async (bucket, folder = '') => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder ? { prefix: folder } : {});

    if (error) throw error;
    return data || [];
  },

  /**
   * Download a file
   * @param {string} bucket - The bucket name
   * @param {string} filePath - The file path in the bucket
   */
  downloadFile: async (bucket, filePath) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) throw error;
    return data;
  },
};

export default storageService;
