"use client";
import { useEffect, useState } from "react";
import { getRequests, updateRequestStatus } from "@/app/khalidnadish/actions/request";
import { getCommentsForRequest, addComment } from "../actions/comment";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "REJECTED";
type RequestType = "BUG" | "FEATURE" | "IMPROVEMENT";

type Comment = {
  id: string;
  message: string;
  createdBy: string;
  createdAt: string | Date;
  requestId: string;
};

type Request = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdBy: string;
  createdAt: string | Date;
  comments?: Comment[];
  attachment: string | null;
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>({});
  const [commentText, setCommentText] = useState<{ [id: string]: string }>({});
  const [commentLoading, setCommentLoading] = useState<{ [id: string]: boolean }>({});

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
      setError("فشل في جلب الطلبات.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!replyId) return;
    setReplyLoading(true);
    setError("");
    setSuccess("");
    try {
      // await addCommentToRequest(replyId, replyText);
      setSuccess("تم إرسال الرد بنجاح");
      setReplyId(null);
      setReplyText("");
      fetchRequests();
    } catch {
      setError("فشل إرسال الرد.");
    } finally {
      setReplyLoading(false);
    }
  }

  async function handleAddComment(requestId: string) {
    if (!(commentText[requestId] || '').trim()) return;
    setCommentLoading(prev => ({ ...prev, [requestId]: true }));
    try {
      await addComment({ requestId, message: commentText[requestId], createdBy: "admin" });
      setCommentText(prev => ({ ...prev, [requestId]: "" }));
      // Refresh comments for this request
      const updated = await getCommentsForRequest(requestId);
      setCommentsMap((prev) => ({ ...prev, [requestId]: updated }));
    } catch {
      setError("فشل إرسال التعليق.");
    } finally {
      setCommentLoading(prev => ({ ...prev, [requestId]: false }));
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">طلبات المستخدمين</h1>
      {loading ? (
        <div className="text-center py-10">جارٍ التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div key={req.id} className={`bg-white rounded-lg shadow-md p-6 mb-6 ${req.status === "DONE" ? "border-green-200 bg-green-50" : ""}`}>
              {/* Status and Type labels */}
              <div className="flex justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold ${req.status === "DONE" ? "bg-green-100 text-green-800" : ""}`}>{req.status}</span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 font-semibold">{req.type}</span>
              </div>
              <div className="font-bold text-lg mb-1">{req.title}</div>
              <div className="text-gray-600 text-sm flex-1">{req.description}</div>
              <div className="text-xs text-gray-400 mt-2">بواسطة: {req.createdBy}</div>
              <div className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleString("ar-EG")}</div>
              {/* Comments Section */}
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
                    value={commentText[req.id] || ""}
                    onChange={e => setCommentText(prev => ({ ...prev, [req.id]: e.target.value }))}
                    placeholder="أضف تعليقًا جديدًا..."
                    disabled={commentLoading[req.id]}
                  />
                  <Button
                    size="sm"
                    disabled={commentLoading[req.id] || !(commentText[req.id] || '').trim()}
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
