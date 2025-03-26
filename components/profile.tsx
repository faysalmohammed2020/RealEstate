// components/Profile.tsx
import React from 'react';

interface ProfileProps {
  name: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  licenseNumber: string;
  profilePicture: string;
  bio: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  properties: string[];
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  phone,
  role,
  companyName,
  licenseNumber,
  profilePicture,
  bio,
  socialLinks,
  properties
}) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-8">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 className="text-4xl font-semibold text-gray-800">{name}</h2>
          <p className="text-lg text-gray-600">{role} at {companyName}</p>
          <p className="text-sm text-gray-500">License: {licenseNumber}</p>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Bio</h3>
        <p className="text-gray-600 mt-2">{bio}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Properties</h3>
        <ul className="list-disc pl-5 mt-4">
          {properties.map((property, index) => (
            <li key={index} className="text-gray-600">{property}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Social Links</h3>
        <div className="flex space-x-6 mt-4">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">
              Instagram
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700">
              LinkedIn
            </a>
          )}
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              Facebook
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
