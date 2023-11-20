export interface Props {
  name: string;
}

export function Dummy({ name }: Props) {
  return (
    <span>Hello {name}, dummy component is working!</span>
  );
}
