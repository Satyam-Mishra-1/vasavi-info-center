// src/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import API from './api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Promoter',
    phone: '',
    email: '',
    password: '',
    country: '',
    state: '',
    district: '',
    mandal: '',
    manualCity: '',
  });

  const [locations, setLocations] = useState({ countries: [], states: [], districts: [], mandals: [] });

  useEffect(() => {
    API.get('/locations/countries').then(res => {
      setLocations(prev => ({ ...prev, countries: res.data }));
    });
  }, []);

  const fetchChildren = (type, parentId) => {
    API.get(`/locations?parentId=${parentId}`).then(res => {
      setLocations(prev => ({ ...prev, [type]: res.data }));
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (type, value) => {
    handleChange({ target: { name: type, value } });

    if (type === 'country') {
      fetchChildren('states', value);
    } else if (type === 'state') {
      fetchChildren('districts', value);
    } else if (type === 'district') {
      fetchChildren('mandals', value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      location: formData.mandal || formData.manualCity,
    };

    await API.post('/auth/register', payload);
    alert('Registered successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 shadow-xl bg-white rounded-xl">
      <h2 className="text-2xl font-bold">Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required className="input" />
      <select name="role" onChange={handleChange} className="input">
        <option value="Promoter">Promoter</option>
        <option value="Chairman">Chairman</option>
        <option value="Coordinator">Coordinator</option>
      </select>
      <input name="phone" placeholder="Phone" onChange={handleChange} required className="input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />

      {/* Location hierarchy */}
      <select name="country" onChange={e => handleLocationChange('country', e.target.value)} className="input" required>
        <option value="">Select Country</option>
        {locations.countries.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
      </select>
      <select name="state" onChange={e => handleLocationChange('state', e.target.value)} className="input" required>
        <option value="">Select State</option>
        {locations.states.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
      </select>
      <select name="district" onChange={e => handleLocationChange('district', e.target.value)} className="input" required>
        <option value="">Select District</option>
        {locations.districts.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
      </select>
      <select name="mandal" onChange={handleChange} className="input">
        <option value="">Select Mandal (or enter manually)</option>
        {locations.mandals.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
      </select>

      <input name="manualCity" placeholder="Enter City Manually (if not listed)" onChange={handleChange} className="input" />

      <button type="submit" className="btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
