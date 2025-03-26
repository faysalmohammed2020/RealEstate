// pages/profile.tsx
import { NextPage } from 'next';
import Profile from '../../../components/profile';

const ProfilePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <Profile
          name="Faysal Rahman"
          email="faysal@realestate.com"
          phone="+123 456 7890"
          role="Real Estate Agent"
          companyName="XYZ Realty"
          licenseNumber="RE-1234567"
          profilePicture="https://randomuser.me/api/portraits/men/1.jpg"
          bio="I am a dedicated real estate agent with over 10 years of experience in helping clients buy, sell, and rent properties. I specialize in residential properties and offer personalized services to meet the unique needs of each client."
          socialLinks={{
            instagram: "https://www.instagram.com/faysal_realty/",
            linkedin: "https://www.linkedin.com/in/faysal-real-estate-agent/",
            facebook: "https://www.facebook.com/faysalrealty/",
          }}
          properties={[
            '123 Main St, Apartment 4B, New York, NY',
            '456 Oak St, House, San Francisco, CA',
            '789 Maple St, Condo, Miami, FL',
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
