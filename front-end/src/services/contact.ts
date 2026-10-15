
import type { ContactForm } from "../types/contact";

const API_URL = "http://127.0.0.1:8000/api/messages/";

export async function sendContactMessage(
  form: ContactForm,
): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    if (data?.email) {
      throw new Error("لطفاً آدرس ایمیل خود را بررسی کنید.");
    }

    if (data?.name || data?.subject || data?.message) {
      throw new Error("اطلاعات واردشده معتبر نیستند.");
    }

    throw new Error(
      data?.detail || "ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.",
    );
  }
}