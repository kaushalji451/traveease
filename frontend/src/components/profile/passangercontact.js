"use client";
import React, { useState } from 'react';

const PassangerContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emails, setEmails] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    
    const emailList = emails.split(',').map((e) => e.trim()).filter((e) => e !== '');
    
    if (!emailList.length) newErrors.emails = 'At least one email required';
    if (!mobile) newErrors.mobile = 'Required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert(
        'Contact Details Submitted!\n' +
          'Emails: ' + emailList.join(', ') +
          '\nMobile No: ' + mobile
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg my-6 max-w-5xl mx-auto">
      {/* Collapse toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b border-slate-300 pb-2 mb-3"
      >
        <h2 className="text-lg font-semibold">Contact Details</h2>
        <span
          className="text-xl transform transition-transform"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ⌄
        </span>
      </div>

      {isOpen && (
        <form className="space-y-6" onSubmit={handleSubmit}>
         <div className='flex gap-10 w-full '>
             {/* Emails */}
          <div className='w-1/2'>
            <label className="block text-sm font-medium">Email Id(s)</label>
            <input
              type="text"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
              placeholder="Enter emails separated by commas"
            />
            {errors.emails && <div className="text-red-500 text-xs mt-1">{errors.emails}</div>}
          </div>

          {/* Mobile No */}
          <div className='w-1/2'>
            <label className="block text-sm font-medium">Mobile No</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
              placeholder="Enter mobile number"
            />
            {errors.mobile && <div className="text-red-500 text-xs mt-1">{errors.mobile}</div>}
          </div>
         </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#A8E6A1] text-white py-2 px-8 rounded hover:bg-[#A8E6A1] focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PassangerContact;
