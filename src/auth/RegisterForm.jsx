

import { UserPlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const locationData = {
  countries: [
    { id: 'in', name: 'India' },
    { id: 'us', name: 'United States' },
  ],
  states: {
    in: [
      { id: 'mh', name: 'Maharashtra' },
      { id: 'ka', name: 'Karnataka' },
    ],
    us: [
      { id: 'ny', name: 'New York' },
      { id: 'ca', name: 'California' },
    ],
  },
  districts: {
    mh: [
      { id: 'nag', name: 'Nagpur' },
      { id: 'mum', name: 'Mumbai' },
    ],
    ka: [
      { id: 'blg', name: 'Bangalore' },
      { id: 'mys', name: 'Mysore' },
    ],
    ny: [
      { id: 'nyc', name: 'New York City' },
    ],
    ca: [
      { id: 'la', name: 'Los Angeles' },
    ],
  },
  mandals: {
    nag: [
      { id: 'nag1', name: 'Nagpur North' },
      { id: 'nag2', name: 'Nagpur South' },
    ],
    mum: [
      { id: 'mum1', name: 'Andheri' },
      { id: 'mum2', name: 'Borivali' },
    ],
    blg: [
      { id: 'blg1', name: 'BTM Layout' },
      { id: 'blg2', name: 'Indiranagar' },
    ],
  },
};

const RegisterForm = () => {
  const navigate = useNavigate();
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
    setLocations(prev => ({ ...prev, countries: locationData.countries }));
  }, []);

  const fetchChildren = (type, parentId) => {
    let data = [];

    if (type === 'states') {
      data = locationData.states[parentId] || [];
    } else if (type === 'districts') {
      data = locationData.districts[parentId] || [];
    } else if (type === 'mandals') {
      data = locationData.mandals[parentId] || [];
    }

    setLocations(prev => ({ ...prev, [type]: data }));

    // Clear dependent dropdowns
    if (type === 'states') {
      setLocations(prev => ({ ...prev, districts: [], mandals: [] }));
      setFormData(prev => ({ ...prev, state: '', district: '', mandal: '' }));
    } else if (type === 'districts') {
      setLocations(prev => ({ ...prev, mandals: [] }));
      setFormData(prev => ({ ...prev, district: '', mandal: '' }));
    } else if (type === 'mandals') {
      setFormData(prev => ({ ...prev, mandal: '' }));
    }
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

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...formData,
      location: formData.mandal || formData.manualCity,
    };
    console.log('Payload to be submitted:', payload);
    
    alert('Form submitted successfully !');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
    <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>


    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 shadow-xl bg-white rounded-xl mt-10 mb-20 border border-gray-300 shadow-2xl">
  <h2 className="text-2xl font-bold">Register</h2>

  <div>
    <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
  </div>

  <div>
    <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
      <option value="Promoter">Promoter</option>
      <option value="Chairman">Chairman</option>
      <option value="Coordinator">Coordinator</option>
    </select>
  </div>

  <div>
    <input name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-2 border rounded" />
  </div>

  <div>
    <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
  </div>

  <div>
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
  </div>

  <div>
    <select name="country" onChange={e => handleLocationChange('country', e.target.value)} className="w-full p-2 border rounded" required>
      <option value="">Select Country</option>
      {locations.countries.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
    </select>
  </div>

  <div>
    <select name="state" onChange={e => handleLocationChange('state', e.target.value)} className="w-full p-2 border rounded" required>
      <option value="">Select State</option>
      {locations.states.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
    </select>
  </div>

  <div>
    <select name="district" onChange={e => handleLocationChange('district', e.target.value)} className="w-full p-2 border rounded" required>
      <option value="">Select District</option>
      {locations.districts.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
    </select>
  </div>

  <div>
    <select name="mandal" onChange={handleChange} className="w-full p-2 border rounded">
      <option value="">Select Mandal (or enter manually)</option>
      {locations.mandals.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
    </select>
  </div>

  <div>
    <input name="manualCity" placeholder="Enter City Manually (if not listed)" onChange={handleChange} className="w-full p-2 border rounded" />
  </div>

  <div>
    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Register</button>
  </div>
</form>

</div>
</div>

  );
};

export default RegisterForm;
