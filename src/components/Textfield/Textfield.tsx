import { formatCurrency } from '../../utils/formatCurrency';
import './Textfield.css';

interface TextFieldProps {
  label: string;
  growth?: number;
  money?: boolean;
  value?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ label, growth, value, onChange, money, error }: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = money ? formatCurrency(e.target.value) : e.target.value;
    onChange({ ...e, target: { ...e.target, value: formattedValue } });
  }
  return (
    <div className={'textbox'} style={{ flex: growth }}>
      <label>{label}</label>
      <input maxLength={100} className={'field'} value={value} onChange={handleChange} type="text" />
      <span className={'error-display'}>{error}</span>
    </div>
  )
}