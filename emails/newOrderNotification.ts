interface OrderItem {
  name: string
  quantity: number
  priceAtPurchase: number
}

interface NewOrderEmailData {
  restaurantName: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  orderId: string
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export function buildNewOrderEmail(data: NewOrderEmailData): { subject: string; html: string } {
  const { restaurantName, customerName, customerEmail, items, total, orderId } = data

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
        <tr><td style="background:#111827;border-radius:12px 12px 0 0;padding:32px 32px 24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:#fff;opacity:0.6;text-transform:uppercase;letter-spacing:1px;">New Order</p>
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;">You have a new order!</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px;border-radius:0 0 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <p style="margin:0 0 4px;font-size:15px;color:#6b7280;">Customer</p>
          <p style="margin:0 0 24px;font-size:16px;font-weight:600;color:#111827;">
            ${customerName} &lt;${customerEmail}&gt;
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
          <p style="margin:0;font-size:13px;color:#9ca3af;">MerchMarket · ${restaurantName}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject: `New order — ${formatCurrency(total)} from ${customerName}`, html }
}
