interface ButtonProps {
  label?: string;
  handleClick: () => void;
}

export default function Button({
  label = "Boton X",
  handleClick,
}: ButtonProps) {
  return <button onClick={handleClick}>{label}</button>;
}
