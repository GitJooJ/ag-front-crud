export function formatCurrency(value: string): string {
  const number = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
