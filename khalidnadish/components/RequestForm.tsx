// نموذج إضافة طلب جديد - واجهة عربية بسيطة
import React, { useState } from "react";
import { RequestType } from "@prisma/client";

interface Props {
  onSubmit: (data: Omit<RequestFormData, "attachment"> & { attachment?: File }) => Promise<void>;
  loading: boolean;
}

export interface RequestFormData {
  title: string;
  description: string;
  type: RequestType;
  createdBy: string;
  attachment?: File;
}

const typeOptions = [
  { value: RequestType.BUG, label: "مشكلة" },
  { value: RequestType.FEATURE, label: "طلب جديد" },
  { value: RequestType.IMPROVEMENT, label: "تعديل" },
];

export default function RequestForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<RequestFormData>({
    title: "",
    description: "",
    type: RequestType.BUG,
    createdBy: "",
    attachment: undefined,
  });
  const [error, setError] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.createdBy) {
      setError("جميع الحقول مطلوبة.");
      return;
    }
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center mb-2">إرسال طلب جديد</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">عنوان الطلب</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
          placeholder="مثال: تعديل صفحة الرئيسية"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">نوع الطلب</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">وصف الطلب</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
          placeholder="يرجى شرح الطلب بالتفصيل..."
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">اسمك أو بريدك الإلكتروني</label>
        <input
          name="createdBy"
          value={form.createdBy}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
          placeholder="اسم العميل أو البريد الإلكتروني"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">مرفق (اختياري)</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white rounded py-2 font-semibold hover:bg-primary/90 transition-colors"
      >
        {loading ? "جاري الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}
