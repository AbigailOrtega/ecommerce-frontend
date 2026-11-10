/** Every order status (backend OrderStatus) in Spanish, with a tone for its color. */
export type StatusTone = 'neutral' | 'info' | 'progress' | 'success' | 'warning' | 'danger';

export const ORDER_STATUS: Record<string, { label: string; tone: StatusTone }> = {
  PENDING:            { label: 'Pendiente de pago',    tone: 'warning' },
  CONFIRMED:          { label: 'Confirmado',           tone: 'info' },
  PROCESSING:         { label: 'Preparando',           tone: 'progress' },
  SHIPMENT_PENDING:   { label: 'Guía en proceso',      tone: 'progress' },
  SHIPPED:            { label: 'Enviado',              tone: 'progress' },
  DELIVERY_ATTEMPT:   { label: 'Intento de entrega',   tone: 'warning' },
  DELIVERY_EXCEPTION: { label: 'Problema de entrega',  tone: 'danger' },
  DELIVERED:          { label: 'Entregado',            tone: 'success' },
  CANCELLED:          { label: 'Cancelado',            tone: 'neutral' },
  REFUNDED:           { label: 'Reembolsado',          tone: 'neutral' },
};

/** The order statuses in the order a sale goes through them. */
export const ORDER_STATUS_ORDER = Object.keys(ORDER_STATUS);

export function orderStatusLabel(status: string | null | undefined): string {
  return status ? (ORDER_STATUS[status]?.label ?? status) : '';
}

export function orderStatusTone(status: string | null | undefined): StatusTone {
  return (status && ORDER_STATUS[status]?.tone) || 'neutral';
}
