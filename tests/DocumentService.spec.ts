import { test } from "@japa/runner";
import { DocumentService } from '../app/services/DocumentService'

test.group("DocumentService", () => {
  test("Check if Document List is sent as response", ({ expect }) => {
    expect(DocumentService.multiDoc)
  });
});