import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/digital-twin-logo.png';

function DigitalTwinLogo({ className = '', imageClassName = '' }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const logo = (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden bg-white ${className}`}>
      <img
        src={logoUrl}
        alt="DigitalTwin logo"
        className={`h-[118%] w-[118%] object-contain ${imageClassName}`}
      />
    </span>
  );

  return isLoginPage ? logo : <Link to="/dashboard">{logo}</Link>;
}

export default DigitalTwinLogo;
