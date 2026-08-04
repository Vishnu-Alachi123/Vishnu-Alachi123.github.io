import Nav from './components/Nav';
import ProfilePage from './components/profile/ProfilePage';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <ProfilePage />
      </main>
      <Footer />
    </>
  );
}
