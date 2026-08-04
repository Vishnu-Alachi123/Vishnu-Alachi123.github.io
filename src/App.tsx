import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import ProfilePage from './components/profile/ProfilePage';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    if (isAuthenticated) {
      setAdminOpen(true);
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        <ProfilePage />
      </main>
      <Footer onAdminClick={() => setLoginModalOpen(true)} />

      {loginModalOpen && (
        <LoginModal
          onLogin={() => {
            setLoginModalOpen(false);
            setAdminOpen(true);
          }}
          onClose={() => setLoginModalOpen(false)}
        />
      )}

      {adminOpen && (
        <AdminPanel
          onLogout={() => {
            localStorage.removeItem('admin_authenticated');
            setAdminOpen(false);
          }}
        />
      )}
    </>
  );
}
