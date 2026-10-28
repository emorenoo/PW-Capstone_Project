import { randomUUID } from "node:crypto";

export function generateRandomEmail(): string {
  return `test-${randomUUID()}@example.com`;
}
