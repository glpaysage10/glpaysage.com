"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateDevisRequest } from "@/lib/devis-requests";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateStatusAction(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;

  await updateDevisRequest(id, { status: status as never });
  revalidatePath(`/admin/${id}`);
  revalidatePath("/admin");
}

export async function updateNotesAction(formData: FormData) {
  const id = formData.get("id");
  const notes = formData.get("notes");
  if (typeof id !== "string" || typeof notes !== "string") return;

  await updateDevisRequest(id, { notes });
  revalidatePath(`/admin/${id}`);
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
