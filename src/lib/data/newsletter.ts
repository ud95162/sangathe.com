/**
 * Stores a newsletter subscriber (Phase 1 only collects addresses; no email is sent).
 * Mock: accepts and discards. The real version inserts into the subscribers table,
 * treating an existing address as success so the form never reveals who is subscribed.
 */
export async function saveSubscriber(email: string): Promise<void> {
  void email;
}
