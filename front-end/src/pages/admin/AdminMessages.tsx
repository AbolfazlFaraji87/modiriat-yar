import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  Clock3,
  Inbox,
  Check,
  AlertCircle,
  X,
} from "lucide-react";

import { useAuth } from "../../contexts/useAuth";
import {
  deleteMessage,
  getMessages,
  updateMessageReadStatus,
  type ContactMessage,
} from "../../services/messages";

type MessageFilter = "all" | "unread" | "read";

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "تاریخ نامشخص";
  }

  return date.toLocaleString("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminMessages() {
  const { token } = useAuth();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!token) {
      setError("نشست شما معتبر نیست. لطفاً دوباره وارد شوید.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getMessages(token);
      setMessages(data);

      setSelectedId((currentId) =>
        currentId !== null && data.some((item) => item.id === currentId)
          ? currentId
          : null,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "دریافت پیام‌ها ناموفق بود.",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const unreadCount = messages.filter((message) => !message.is_read).length;

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return messages.filter((message) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && !message.is_read) ||
        (filter === "read" && message.is_read);

      const matchesSearch = [
        message.name,
        message.email,
        message.subject,
        message.message,
      ].some((value) => value.toLocaleLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  const selectedMessage =
    messages.find((message) => message.id === selectedId) ?? null;

  async function toggleReadStatus(message: ContactMessage) {
    if (!token || busy) return;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const updated = await updateMessageReadStatus(
        token,
        message.id,
        !message.is_read,
      );

      setMessages((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );

      setNotice(
        updated.is_read
          ? "پیام به‌عنوان خوانده‌شده علامت خورد."
          : "پیام به‌عنوان خوانده‌نشده علامت خورد.",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "به‌روزرسانی پیام ناموفق بود.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function openMessage(message: ContactMessage) {
    setSelectedId(message.id);
    setConfirmDelete(false);
    setNotice("");
    setError("");

    if (!message.is_read && token && !busy) {
      setBusy(true);

      try {
        const updated = await updateMessageReadStatus(token, message.id, true);

        setMessages((current) =>
          current.map((item) => (item.id === updated.id ? updated : item)),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "تغییر وضعیت پیام ناموفق بود.",
        );
      } finally {
        setBusy(false);
      }
    }
  }

  async function handleDelete() {
    if (!token || !selectedMessage || busy) return;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      await deleteMessage(token, selectedMessage.id);

      setMessages((current) =>
        current.filter((item) => item.id !== selectedMessage.id),
      );
      setSelectedId(null);
      setConfirmDelete(false);
      setNotice("پیام با موفقیت حذف شد.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حذف پیام ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir="rtl" className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-orange-400">ارتباط با کاربران</p>
          <h1 className="mt-2 text-3xl font-black text-white">صندوق پیام‌ها</h1>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            پیام‌های ارسال‌شده از فرم تماس سایت را مشاهده و مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadMessages()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          بروزرسانی
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">همه پیام‌ها</span>
            <Inbox className="text-orange-400" size={21} />
          </div>
          <p className="mt-4 text-3xl font-black text-white">
            {messages.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">خوانده‌نشده</span>
            <Mail className="text-orange-400" size={21} />
          </div>
          <p className="mt-4 text-3xl font-black text-white">{unreadCount}</p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-7 text-red-300"
        >
          <AlertCircle size={19} className="mt-1 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-300"
        >
          <Check size={18} />
          {notice}
        </div>
      )}

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
        <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <div className="space-y-4 border-b border-white/10 p-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جست‌وجو در پیام‌ها..."
                className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pr-10 pl-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-400"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["all", "همه"],
                  ["unread", "جدید"],
                  ["read", "خوانده‌شده"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-lg px-2 py-2 text-xs font-bold transition sm:text-sm ${
                    filter === value
                      ? "bg-orange-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[680px] overflow-y-auto">
            {loading ? (
              <div className="p-10 text-center text-sm text-slate-400">
                در حال دریافت پیام‌ها...
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="px-5 py-14 text-center">
                <Inbox size={32} className="mx-auto text-slate-600" />
                <p className="mt-4 font-bold text-slate-300">پیامی پیدا نشد</p>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  فیلتر یا عبارت جست‌وجو را تغییر دهید.
                </p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => void openMessage(message)}
                  className={`block w-full border-b border-white/5 p-4 text-right transition hover:bg-white/5 ${
                    selectedId === message.id ? "bg-orange-500/10" : ""
                  } ${
                    !message.is_read ? "border-r-2 border-r-orange-400" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        message.is_read
                          ? "bg-white/5 text-slate-400"
                          : "bg-orange-500/15 text-orange-300"
                      }`}
                    >
                      {message.is_read ? (
                        <MailOpen size={19} />
                      ) : (
                        <Mail size={19} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            message.is_read
                              ? "font-medium text-slate-300"
                              : "font-extrabold text-white"
                          }`}
                        >
                          {message.name}
                        </p>
                        {!message.is_read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                        )}
                      </div>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-400">
                        {message.subject}
                      </p>

                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                        {message.message}
                      </p>

                      <p className="mt-3 text-[11px] text-slate-600">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-white/10 bg-slate-900">
          {!selectedMessage ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-slate-500">
                <Mail size={29} />
              </div>
              <h2 className="mt-5 text-lg font-bold text-slate-200">
                پیامی انتخاب نشده است
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                برای مشاهده جزئیات، یکی از پیام‌های صندوق را انتخاب کنید.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-orange-400">
                    جزئیات پیام
                  </span>
                  <h2 className="mt-2 break-words text-xl font-black leading-8 text-white">
                    {selectedMessage.subject}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="بستن جزئیات"
                  onClick={() => {
                    setSelectedId(null);
                    setConfirmDelete(false);
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300">
                    <UserRound size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white">
                      {selectedMessage.name}
                    </p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="mt-1 block break-all text-sm text-orange-300 hover:text-orange-200"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 size={15} />
                  <span>{formatDate(selectedMessage.created_at)}</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="whitespace-pre-wrap break-words text-sm leading-8 text-slate-300">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleReadStatus(selectedMessage)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {selectedMessage.is_read ? (
                      <Mail size={17} />
                    ) : (
                      <MailOpen size={17} />
                    )}
                    {selectedMessage.is_read
                      ? "علامت‌گذاری به‌عنوان خوانده‌نشده"
                      : "علامت‌گذاری به‌عنوان خوانده‌شده"}
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setConfirmDelete(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                    حذف پیام
                  </button>
                </div>

                {confirmDelete && (
                  <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4">
                    <p className="font-bold text-red-200">
                      از حذف این پیام مطمئن هستید؟
                    </p>
                    <p className="mt-2 text-sm leading-7 text-red-200/70">
                      این عملیات قابل بازگشت نیست.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete()}
                        className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                      >
                        {busy ? "در حال انجام..." : "بله، حذف کن"}
                      </button>

                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setConfirmDelete(false)}
                        className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/5"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
