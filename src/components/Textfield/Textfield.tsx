import './Textfield.css';

interface TextFieldProps {
  label: string;
  growth?: number;
  value?: string | number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ label, growth, value, onChange, error }: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value;
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