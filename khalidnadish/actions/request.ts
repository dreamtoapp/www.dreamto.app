"use server"// جميع الأكشنات الخاصة بنظام الطلبات (Type Safe)
import db from '@/lib/prisma';
import { RequestType, RequestStatus } from "@prisma/client";


 

export async function getRequests() {
  return await db.request.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getRequestById(id: string) {
  return await db.request.findUnique({ where: { id } });
}

export async function createRequest({
  title,
  description,
  type,
  createdBy,
  attachment,
}: {
  title: string;
  description: string;
  type: RequestType;
  createdBy: string;
  attachment?: string;
}) {
  try {
    return await db.request.create({
      data: {
        title,
        description,
        type,
        createdBy,
        attachment,
      },
    });
  } catch (error) {
    console.error('Error creating request:', error);
    throw new Error('فشل إرسال الطلب. تحقق من الحقول أو حاول لاحقاً.');
  }
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  return await db.request.update({
    where: { id },
    data: { status },
  });
}

export async function addCommentToRequest({
  requestId,
  userId,
  content,
}: {
  requestId: string;
  userId: string;
  content: string;
}) {
  try {
    return await db.comment.create({
      data: {
        requestId,
        userId,
        content,
      },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('فشل إضافة التعليق. حاول مرة أخرى لاحقاً.');
  }
}
