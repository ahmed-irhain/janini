/** Local-only id generator — good enough for single-device, unsynced prototype data. */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
