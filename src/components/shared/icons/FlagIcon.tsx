import { COUNTRY_CODE_MAP } from '../../../constants/countries';
import '/node_modules/flag-icons/css/flag-icons.min.css';

interface Props {
  countryCode: string;
}
function FlagIcon({ countryCode }: Props) {
  return (
    <span
      className={`fi fi-${COUNTRY_CODE_MAP[countryCode]}`}
      style={{ width: '20px', height: '20px', borderRadius: '7px' }}
    ></span>
  );
}

export default FlagIcon;
