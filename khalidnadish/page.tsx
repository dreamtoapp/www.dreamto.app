"use client";
import { useState, useEffect } from "react";
import RequestForm, { RequestFormData } from "./components/RequestForm";
import { getRequests, createRequest, updateRequestStatus } from "./actions/request";
import { getCommentsForRequest, addComment } from "./actions/comment";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "REJECTED";
type RequestType = "BUG" | "FEATURE" | "IMPROVEMENT";

type Request = {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  status: RequestStatus;
  createdBy: string;
  createdAt: Date;
  comment: string | null;
  attachment: string | null;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>({});
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      const reqs = await getRequests();
      setRequests(reqs);
      const commentsObj: Record<string, any[]> = {};
      for (const req of reqs) {
        commentsObj[req.id] = await getCommentsForRequest(req.id);
      }
      setCommentsMap(commentsObj);
    } catch {
      setError("حدث خطأ أثناء جلب الطلبات.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateRequest(data: RequestFormData) {
    setFormLoading(true);
    setError("");
    setSuccess("");
    try {
      const { attachment, ...rest } = data;
      await createRequest({
        ...rest,
        attachment: undefined,
      });
      setSuccess("تم إنشاء الطلب بنجاح!");
      fetchRequests();
      setOpen(false);
    } catch {
      setError("حدث خطأ أثناء إنشاء الطلب.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleAddComment(requestId: string) {
    if (!commentText.trim()) return;
    setCommentLoading(requestId);
    try {
      await addComment({ requestId, message: commentText, createdBy: "user" }); 
      setCommentText("");
      const updated = await getCommentsForRequest(requestId);
      setCommentsMap((prev) => ({ ...prev, [requestId]: updated }));
    } catch {
      setError("تعذر إرسال التعليق.");
    } finally {
      setCommentLoading(null);
    }
  }

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) setSuccess("");
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">جميع الطلبات</h1>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)} className="bg-primary text-white font-semibold">
              طلب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg min-w-[350px] sm:min-w-[440px] md:min-w-[500px] px-6 py-8">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold mb-4">إرسال طلب جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <RequestForm onSubmit={handleCreateRequest} loading={formLoading} />
              {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
              {success && <div className="text-green-600 mt-2 text-center">{success}</div>}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <div className="text-center py-10">جارٍ التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className={`rounded-lg shadow p-5 border flex flex-col gap-2 transition-colors duration-200 ${req.status === "DONE" ? "bg-green-50 border-green-300" : "bg-white border-gray-100"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                  {req.type}
                </span>
                <span className={`text-xs px-2 py-1 rounded font-bold ${req.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : req.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" : req.status === "DONE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {req.status}
                </span>
              </div>
              <h2 className="font-semibold text-lg mt-2 mb-1">{req.title}</h2>
              <div className="text-gray-600 text-sm flex-1">{req.comment || req.description}</div>
              <div className="text-xs text-gray-400 mt-2">بواسطة: {req.createdBy}</div>
              <div className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleString("ar-EG")}</div>
              {/* تعليقات الطلب */}
              <div className="mt-3">
                <div className="font-semibold text-xs text-gray-700 mb-1">التعليقات:</div>
                <div className="space-y-2">
                  {(commentsMap[req.id] || []).map((c) => (
                    <div key={c.id} className="bg-gray-50 rounded p-2 text-xs flex flex-col">
                      <span className="font-bold">{c.createdBy}:</span>
                      <span>{c.message}</span>
                      <span className="text-gray-400 self-end">{new Date(c.createdAt).toLocaleString("ar-EG")}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    className="flex-1 border rounded p-1 text-xs"
                    value={commentLoading === req.id ? "جارٍ الإرسال..." : commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="أضف تعليقًا جديدًا..."
                    disabled={commentLoading === req.id}
                  />
                  <Button
                    size="sm"
                    disabled={commentLoading === req.id || !commentText.trim()}
                    onClick={() => handleAddComment(req.id)}
                  >
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
