// Email utility functions
// In production, integrate with services like SendGrid, Resend, or AWS SES

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // TODO: Implement actual email sending
  // For now, just log to console
  console.log('📧 Email would be sent:', {
    to: options.to,
    subject: options.subject,
  });

  // In production, use a service like:
  // - Resend: https://resend.com
  // - SendGrid: https://sendgrid.com
  // - AWS SES: https://aws.amazon.com/ses/
  // - Nodemailer with SMTP

  return true;
}

export function generateOrderConfirmationEmail(
  orderNumber: string,
  customerEmail: string,
  orderTotal: number,
  locale: 'he' | 'en'
): EmailOptions {
  const isHebrew = locale === 'he';

  return {
    to: customerEmail,
    subject: isHebrew
      ? `אישור הזמנה ${orderNumber}`
      : `Order Confirmation ${orderNumber}`,
    html: isHebrew
      ? `
        <html dir="rtl">
          <body>
            <h1>תודה על הזמנתך!</h1>
            <p>מספר הזמנה: <strong>${orderNumber}</strong></p>
            <p>סה"כ לתשלום: <strong>₪${orderTotal.toFixed(2)}</strong></p>
            <p>ההזמנה שלך התקבלה ותטופל בהקדם.</p>
          </body>
        </html>
      `
      : `
        <html dir="ltr">
          <body>
            <h1>Thank you for your order!</h1>
            <p>Order Number: <strong>${orderNumber}</strong></p>
            <p>Total: <strong>₪${orderTotal.toFixed(2)}</strong></p>
            <p>Your order has been received and will be processed shortly.</p>
          </body>
        </html>
      `,
    text: isHebrew
      ? `תודה על הזמנתך! מספר הזמנה: ${orderNumber}, סה"כ: ₪${orderTotal.toFixed(2)}`
      : `Thank you for your order! Order Number: ${orderNumber}, Total: ₪${orderTotal.toFixed(2)}`,
  };
}

