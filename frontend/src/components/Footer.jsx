import { useFetch } from '../hooks/useFetch';
import { profileService } from '../services/apiService';
import './Footer.css';

const Footer = () => {
  const { data: profile } = useFetch(profileService.getProfile);
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>&copy; {currentYear} {profile?.nombre} {profile?.apellidos} - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
