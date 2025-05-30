"use server";
import db from '@/lib/prisma';

export async function addComment({ requestId, message, createdBy }: { requestId: string, message: string, createdBy: string }) {
  try {
    return await db.comment.create({
      data: {
        requestId,
        message,
        createdBy,
      },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('فشل إرسال التعليق. حاول مرة أخرى.');
  }
}

export async function getCommentsForRequest(requestId: string) {
  try {
    return await db.comment.findMany({
      where: { requestId },
      orderBy: { createdAt: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('فشل في جلب التعليقات.');
  }
}
