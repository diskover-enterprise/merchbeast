interface OrderItem {
  name: string
  quantity: number
  priceAtPurchase: number
}

interface OrderEmailData {
  customerName: string
  restaurantName: string
  items: OrderItem[]
  total: number
  orderId: string
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export function buildOrderConfirmationEmail(data: OrderEmailData): { subject: string; html: string } {
  const { customerName, restaurantName, items, total, orderId } = data

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;color:#374151;font-size:15px;">${item.name} × ${item.quantity}</td>
        <td style="padding:8px 0;color:#374151;font-size:15px;text-align:right;font-weight:600;">
          ${formatCurrency(item.priceAtPurchase * item.quantity)}
        </td>
      </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td style="background:#f97316;border-radius:12px 12px 0 0;padding:32px 32px 24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:#fff;opacity:0.85;text-transform:uppercase;letter-spacing:1px;">Order Confirmed</p>
          <h1 style="margin:0;font-size:28px;font-weight:800;color:#fff;">Thank you, ${customerName}!</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px;border-radius:0 0 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
            Your order from <strong style="color:#111827;">${restaurantName}</strong> has been received and is being prepared.
          </p>

          <!-- Order items -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;margin-bottom:8px;">
            ${itemRows}
          </table>

          <!-- Total -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #111827;margin-top:8px;">
            <tr>
              <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:#111827;">Total</td>
              <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:#111827;text-align:right;">${formatCurrency(total)}</td>
            </tr>
          </table>

          <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
            Order ID: ${orderId}
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0;font-size:13px;color:#9ca3af;">MerchMarket · Questions? Reply to this email.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject: `Order confirmed — ${restaurantName}`, html }
}
