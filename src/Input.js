export function Input({ type, value, onChange }) {
  return <input className="border p-2 rounded-md w-full" type={type} value={value} onChange={onChange} />;
}
