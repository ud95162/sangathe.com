"use server";

import { saveSubscriber } from "@/lib/data/newsletter";

export type SubscribeState = { status: "idle" | "success" | "invalid" | "failed" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return { status: "invalid" };
  try {
    await saveSubscriber(email);
    return { status: "success" };
  } catch {
    return { status: "failed" };
  }
}
