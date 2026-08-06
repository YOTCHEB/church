import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaClipboardList, FaHeart, FaSignOutAlt, FaHome, FaPlus, FaEdit, FaTrash, FaDollarSign, FaChartLine, FaBell, FaSearch, FaFilter, FaDownload, FaCheck, FaTimes, FaImage, FaUpload, FaPlay, FaVideo } from 'react-icons/fa';
import { staffService, programsService, donationsService, videosService } from '../../supabaseService';
import { authService } from '../../authService';
import supabase from '../../supabase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ staff: 0, programs: 0, donations: 0, totalAmount: 0 });
  const [recentDonations, setRecentDonations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user
    authService.getUser().then(setCurrentUser);

    // Subscribe to auth changes
    const { unsubscribe } = authService.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user || null);
      if (!session) {
        window.location.href = '/admin';
      }
    });

    return () => unsubscribe();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const unsubStaff = staffService.subscribeToStaff((data) => {
      setStats(prev => ({ ...prev, staff: data.length }));
    });
    const unsubPrograms = programsService.subscribeToPrograms((data) => {
      setStats(prev => ({ ...prev, programs: data.length }));
    });
    const unsubDonations = donationsService.subscribeToDonations((data) => {
      setStats(prev => ({
        ...prev,
        donations: data.length,
        totalAmount: data.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0)
      }));
      setRecentDonations(data.slice(0, 5));
    });
    return () => {
      unsubStaff();
      unsubPrograms();
      unsubDonations();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
    // Clear any stored data
    localStorage.removeItem('demoAdmin');
    localStorage.removeItem('adminEmail');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <FaHome /> },
    { id: 'staff', label: 'Staff', icon: <FaUsers /> },
    { id: 'programs', label: 'Programs', icon: <FaClipboardList /> },
    { id: 'donations', label: 'Donations', icon: <FaHeart /> },
    { id: 'videos', label: 'Videos', icon: <FaPlay /> }
  ];

  return (
    <div className="admin-dashboard">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>×</button>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.png" alt="JJM" className="sidebar-logo-image" />
          <div className="sidebar-logo-text">
            <span>Jehovah Jireh</span>
            <small>ADMIN</small>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaUsers />
            </button>
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <div className="admin-avatar">
                <FaUsers />
              </div>
              <span className="admin-email">{currentUser?.email || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {activeTab === 'overview' && (
            <OverviewDashboard stats={stats} recentDonations={recentDonations} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'staff' && <StaffManagement addToast={addToast} />}
          {activeTab === 'programs' && <ProgramsManagement addToast={addToast} />}
          {activeTab === 'donations' && <DonationsManagement addToast={addToast} />}
          {activeTab === 'videos' && <VideosManagement addToast={addToast} />}
        </div>
      </main>
    </div>
  );
};

// Overview Dashboard Component
const OverviewDashboard = ({ stats, recentDonations, setActiveTab }) => {
  const overviewCards = [
    { 
      title: 'Total Staff', 
      value: stats.staff, 
      icon: <FaUsers />, 
      color: '#1a365d',
      gradient: 'linear-gradient(135deg, #1a365d, #2c5282)',
      link: 'staff'
    },
    { 
      title: 'Active Programs', 
      value: stats.programs, 
      icon: <FaClipboardList />, 
      color: '#c9a227',
      gradient: 'linear-gradient(135deg, #c9a227, #d4b045)',
      link: 'programs'
    },
    { 
      title: 'Total Donations', 
      value: stats.donations, 
      icon: <FaHeart />, 
      color: '#e53e3e',
      gradient: 'linear-gradient(135deg, #e53e3e, #fc8181)',
      link: 'donations'
    },
    { 
      title: 'Total Amount', 
      value: `MWK ${stats.totalAmount.toLocaleString()}`, 
      icon: <FaDollarSign />, 
      color: '#38a169',
      gradient: 'linear-gradient(135deg, #38a169, #48bb78)',
      link: 'donations'
    }
  ];

  return (
    <div className="overview-dashboard">
      <div className="stats-cards-grid">
        {overviewCards.map((card, index) => (
          <div 
            key={index} 
            className="stat-card-dashboard"
            onClick={() => setActiveTab(card.link)}
          >
            <div className="stat-card-icon" style={{ background: card.gradient }}>
              {card.icon}
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">{card.title}</span>
              <span className="stat-card-value">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <div className="section-header-flex">
          <h2>Recent Donations</h2>
          <button className="btn-view-all" onClick={() => setActiveTab('donations')}>
            View All <FaEdit />
          </button>
        </div>
        {recentDonations.length > 0 ? (
          <div className="recent-donations-list">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="recent-donation-item">
                <div className="donor-info">
                  <div className="donor-avatar">
                    <FaHeart />
                  </div>
                  <div>
                    <h4>{donation.is_anonymous ? 'Anonymous' : donation.donor_name}</h4>
                    <p>{donation.donation_type} • {new Date(donation.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`donation-status ${donation.status}`}>
                  {donation.amount ? `MWK ${parseFloat(donation.amount).toLocaleString()}` : '-'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaHeart className="empty-icon" />
            <p>No donations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Staff Management Component
const StaffManagement = ({ addToast }) => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', email: '', phone: '', bio: '', image_url: '', sort_order: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = staffService.subscribeToStaff(setStaff);
    return () => unsub();
  }, []);

  const openModal = (member = null) => {
    if (member) {
      setEditing(member);
      setForm({
        name: member.name,
        position: member.position,
        email: member.email || '',
        phone: member.phone || '',
        bio: member.bio || '',
        image_url: member.image_url || '',
        sort_order: member.sort_order
      });
      setImagePreview(member.image_url || null);
    } else {
      setEditing(null);
      setForm({ name: '', position: '', email: '', phone: '', bio: '', image_url: '', sort_order: staff.length });
      setImagePreview(null);
    }
    setImageFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = form.image_url;
      
      // Handle image upload (use base64 for demo)
      if (imageFile) {
        imageUrl = imagePreview;
      }

      const staffData = { ...form, image_url: imageUrl };
      
      if (editing) {
        await staffService.updateStaff(editing.id, staffData);
        addToast('Staff member updated successfully!');
      } else {
        await staffService.addStaff(staffData);
        addToast('Staff member added successfully!');
      }
      setShowModal(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      addToast('Error saving staff member. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this staff member?')) {
      try {
        await staffService.deleteStaff(id);
        addToast('Staff member deleted successfully!');
      } catch (err) {
        console.error(err);
        addToast('Error deleting staff member.', 'error');
      }
    }
  };

  return (
    <div className="management-section">
      <div className="section-header-flex">
        <h2>Staff Members</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FaPlus /> Add Staff
        </button>
      </div>
      
      {staff.length > 0 ? (
        <div className="staff-grid-admin">
          {staff.map((m) => (
            <div key={m.id} className="staff-card-admin">
              <div className="staff-card-image">
                <img src={m.image_url || 'img/photos/coordinator.png'} alt={m.name} />
              </div>
              <div className="staff-card-body">
                <h3>{m.name}</h3>
                <p className="position">{m.position}</p>
                <p className="email">{m.email || '-'}</p>
              </div>
              <div className="staff-card-actions">
                <button className="btn-icon edit" onClick={() => openModal(m)} title="Edit">
                  <FaEdit />
                </button>
                <button className="btn-icon delete" onClick={() => handleDelete(m.id)} title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaUsers className="empty-icon" />
          <p>No staff members yet</p>
        </div>
      )}

      {showModal && (
        <Modal
          title={`${editing ? 'Edit' : 'Add'} Staff Member`}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Update' : 'Add'}
        >
          <div className="form-group">
            <label>Profile Image</label>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" className="remove-image" onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}>
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="image-upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                  <FaImage className="upload-icon" />
                  <span>Click to upload image</span>
                  <small>or drag and drop</small>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-file-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://example.com/image.jpg" />
          </div>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Position *</label>
            <input type="text" value={form.position} onChange={(e) => setForm({...form, position: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} rows="3" />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value)})} />
          </div>
        </Modal>
      )}
    </div>
  );
};

// Programs Management Component
const ProgramsManagement = ({ addToast }) => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: 'FaHome', image_url: '', sort_order: 0, is_active: true });

  useEffect(() => {
    const unsub = programsService.subscribeToPrograms(setPrograms);
    return () => unsub();
  }, []);

  const openModal = (program = null) => {
    if (program) {
      setEditing(program);
      setForm({
        title: program.title,
        description: program.description,
        icon: program.icon || 'FaHome',
        image_url: program.image_url || '',
        sort_order: program.sort_order,
        is_active: program.is_active !== false
      });
    } else {
      setEditing(null);
      setForm({ title: '', description: '', icon: 'FaHome', image_url: '', sort_order: programs.length, is_active: true });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await programsService.updateProgram(editing.id, form);
        addToast('Program updated successfully!');
      } else {
        await programsService.addProgram(form);
        addToast('Program added successfully!');
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      addToast('Error saving program. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this program?')) {
      try {
        await programsService.deleteProgram(id);
        addToast('Program deleted successfully!');
      } catch (err) {
        console.error(err);
        addToast('Error deleting program.', 'error');
      }
    }
  };

  return (
    <div className="management-section">
      <div className="section-header-flex">
        <h2>Programs</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FaPlus /> Add Program
        </button>
      </div>
      
      {programs.length > 0 ? (
        <div className="programs-grid-admin">
          {programs.map((p) => (
            <div key={p.id} className="program-card-admin">
              <div className="program-card-header">
                <div className="program-icon-display">{p.icon}</div>
                <span className={`status-badge ${p.is_active ? 'active' : 'inactive'}`}>
                  {p.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description?.substring(0, 100)}...</p>
              <div className="program-card-actions">
                <button className="btn-icon edit" onClick={() => openModal(p)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-icon delete" onClick={() => handleDelete(p.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaClipboardList className="empty-icon" />
          <p>No programs yet</p>
        </div>
      )}

      {showModal && (
        <Modal 
          title={`${editing ? 'Edit' : 'Add'} Program`}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Update' : 'Add'}
        >
          <div className="form-group">
            <label>Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="4" required />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <select value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})}>
              <option value="FaHome">Home</option>
              <option value="FaUtensils">Utensils</option>
              <option value="FaBook">Book</option>
              <option value="FaHeart">Heart</option>
              <option value="FaHandsHelping">Hands</option>
              <option value="FaPrayingHands">Praying Hands</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value)})} />
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} />
            <span>Active</span>
          </label>
        </Modal>
      )}
    </div>
  );
};

// Donations Management Component
const DonationsManagement = ({ addToast }) => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const unsub = donationsService.subscribeToDonations(setDonations);
    return () => unsub();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const { data, error } = await supabase.from('donations').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      addToast(`Donation ${newStatus} successfully!`);
    } catch (err) {
      console.error(err);
      addToast('Error updating donation status.', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Donor Name', 'Email', 'Phone', 'Type', 'Amount', 'Status', 'Message'];
    const csvData = filteredDonations.map(d => [
      new Date(d.created_at).toLocaleDateString(),
      d.is_anonymous ? 'Anonymous' : d.donor_name,
      d.donor_email || '',
      d.donor_phone || '',
      d.donation_type,
      d.amount || '0',
      d.status,
      (d.message || '').replace(/"/g, '""')
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Donations exported successfully!');
  };

  const filteredDonations = donations.filter(d => {
    const matchesSearch = (d.donor_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (d.donor_email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchesType = filterType === 'all' || d.donation_type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const donationTypes = [...new Set(donations.map(d => d.donation_type))];

  return (
    <div className="management-section">
      <div className="section-header-flex">
        <h2>All Donations</h2>
        <button className="btn btn-primary" onClick={handleExportCSV}>
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by donor name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <div className="filter-select">
            <FaFilter />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="filter-select">
            <FaFilter />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              {donationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredDonations.length > 0 ? (
        <div className="donations-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Donor</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((d) => (
                <tr key={d.id}>
                  <td>{new Date(d.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="donor-cell">
                      <div className="donor-avatar-small"><FaHeart /></div>
                      <span>{d.is_anonymous ? 'Anonymous' : d.donor_name}</span>
                    </div>
                  </td>
                  <td className="contact-cell">
                    {d.donor_email && <div className="contact-email">{d.donor_email}</div>}
                    {d.donor_phone && <div className="contact-phone">{d.donor_phone}</div>}
                  </td>
                  <td><span className="type-badge">{d.donation_type}</span></td>
                  <td className="amount-cell">{d.amount ? `MWK ${parseFloat(d.amount).toLocaleString()}` : '-'}</td>
                  <td>
                    <span className={`status-badge ${d.status}`}>{d.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {d.status === 'pending' && (
                        <>
                          <button className="btn-icon approve" onClick={() => handleStatusUpdate(d.id, 'approved')} title="Approve">
                            <FaCheck />
                          </button>
                          <button className="btn-icon reject" onClick={() => handleStatusUpdate(d.id, 'cancelled')} title="Reject">
                            <FaTimes />
                          </button>
                        </>
                      )}
                      {d.status === 'approved' && (
                        <button className="btn-icon complete" onClick={() => handleStatusUpdate(d.id, 'completed')} title="Mark Complete">
                          <FaCheck />
                        </button>
                      )}
                      {d.status === 'completed' && (
                        <span className="completed-badge">✓ Completed</span>
                      )}
                      {d.status === 'cancelled' && (
                        <button className="btn-icon reopen" onClick={() => handleStatusUpdate(d.id, 'pending')} title="Reopen">
                          <FaEdit />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <FaHeart className="empty-icon" />
          <p>{searchTerm || filterStatus !== 'all' || filterType !== 'all' ? 'No matching donations found' : 'No donations yet'}</p>
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ title, children, onClose, onSubmit, submitLabel }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Videos Management Component
const VideosManagement = ({ addToast }) => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    video_url: '', 
    thumbnail_url: '', 
    category: 'Outreach', 
    duration: '', 
    sort_order: 0, 
    is_featured: false 
  });

  useEffect(() => {
    const unsub = videosService.subscribeToVideos(setVideos);
    return () => unsub();
  }, []);

  const openModal = (video = null) => {
    if (video) {
      setEditing(video);
      setForm({
        title: video.title,
        description: video.description || '',
        video_url: video.video_url,
        thumbnail_url: video.thumbnail_url || '',
        category: video.category || 'Outreach',
        duration: video.duration || '',
        sort_order: video.sort_order,
        is_featured: video.is_featured || false
      });
    } else {
      setEditing(null);
      setForm({ 
        title: '', 
        description: '', 
        video_url: '', 
        thumbnail_url: '', 
        category: 'Outreach', 
        duration: '', 
        sort_order: videos.length, 
        is_featured: false 
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await videosService.updateVideo(editing.id, form);
        addToast('Video updated successfully!');
      } else {
        await videosService.addVideo(form);
        addToast('Video added successfully!');
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      addToast('Error saving video. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this video?')) {
      try {
        await videosService.deleteVideo(id);
        addToast('Video deleted successfully!');
      } catch (err) {
        console.error(err);
        addToast('Error deleting video.', 'error');
      }
    }
  };

  return (
    <div className="management-section">
      <div className="section-header-flex">
        <h2>Videos</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FaVideo /> Add Video
        </button>
      </div>

      {videos.length > 0 ? (
        <div className="videos-grid-admin">
          {videos.map((v) => (
            <div key={v.id} className="video-card-admin">
              <div className="video-thumbnail-admin">
                {v.thumbnail_url ? (
                  <img src={v.thumbnail_url} alt={v.title} />
                ) : (
                  <div className="video-placeholder">
                    <FaPlay />
                  </div>
                )}
                {v.is_featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="video-info-admin">
                <span className="video-category-badge">{v.category}</span>
                <h3>{v.title}</h3>
                <p className="video-duration">{v.duration}</p>
                <p className="video-description">{v.description?.substring(0, 80)}...</p>
              </div>
              <div className="video-card-actions">
                <button className="btn-icon edit" onClick={() => openModal(v)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-icon delete" onClick={() => handleDelete(v.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaVideo className="empty-icon" />
          <p>No videos yet</p>
        </div>
      )}

      {showModal && (
        <Modal
          title={`${editing ? 'Edit' : 'Add'} Video`}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Update' : 'Add'}
        >
          <div className="form-group">
            <label>Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="3" />
          </div>
          <div className="form-group">
            <label>Video URL *</label>
            <input type="text" value={form.video_url} onChange={(e) => setForm({...form, video_url: e.target.value})} placeholder="videos/filename.mp4" required />
          </div>
          <div className="form-group">
            <label>Thumbnail URL</label>
            <input type="text" value={form.thumbnail_url} onChange={(e) => setForm({...form, thumbnail_url: e.target.value})} placeholder="img/photos/thumbnail.jpg" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="Outreach">Outreach</option>
                <option value="Programs">Programs</option>
                <option value="Testimony">Testimony</option>
                <option value="Worship">Worship</option>
                <option value="Events">Events</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input type="text" value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} placeholder="5:32" />
            </div>
          </div>
          <div className="form-group">
            <label>Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value)})} />
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({...form, is_featured: e.target.checked})} />
            <span>Featured</span>
          </label>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
