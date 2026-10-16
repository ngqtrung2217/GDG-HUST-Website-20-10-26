import assert from "node:assert/strict";
import test from "node:test";
import { AppDatabaseService } from "./app-database.ts";
import {
  generateGirlInvitationEmail,
  generateBoyInvitationEmail,
  exportAllRecipientsToCSV,
  exportAllRecipientsToJSON,
} from "./email-template.ts";

test("generateGirlInvitationEmail generates valid HTML and plain text with correct link and token", () => {
  const db = new AppDatabaseService({ isMemoryOnly: true, enableSupabase: false });
  const girl = db.getGirlByToken("lanchi_2010");
  assert.ok(girl);

  const group = db.getState().groups[0];
  const email = generateGirlInvitationEmail(girl!, group, "http://localhost:8080");

  assert.equal(email.recipientType, "girl");
  assert.equal(email.recipientName, "Lan Chi");
  assert.ok(email.actionUrl.includes("/play?token=lanchi_2010"));
  assert.ok(email.htmlContent.includes("Bloom With Us"));
  assert.ok(email.htmlContent.includes(email.actionUrl));
  assert.ok(email.plainText.includes(email.actionUrl));
});

test("generateBoyInvitationEmail generates valid HTML with secret code and assigned girl", () => {
  const db = new AppDatabaseService({ isMemoryOnly: true, enableSupabase: false });
  const boy = db.getBoyByToken("minhanh_2010");
  assert.ok(boy);

  const group = db.getState().groups[0];
  const email = generateBoyInvitationEmail(boy!, group, "http://localhost:8080");

  assert.equal(email.recipientType, "boy");
  assert.equal(email.recipientName, "Minh Anh");
  assert.ok(email.actionUrl.includes("/boy?token=minhanh_2010"));
  assert.ok(email.htmlContent.includes("SEN"));
  assert.ok(email.htmlContent.includes("Lan Chi"));
});

test("exportAllRecipientsToCSV generates valid CSV with girls and boys", () => {
  const db = new AppDatabaseService({ isMemoryOnly: true, enableSupabase: false });
  const state = db.getState();
  const csv = exportAllRecipientsToCSV(state.boys, state.girls, state.groups, "http://localhost:8080");

  assert.ok(csv.includes("Lan Chi"));
  assert.ok(csv.includes("Minh Anh"));
  assert.ok(csv.includes("/play?token="));
  assert.ok(csv.includes("/boy?token="));
});

test("exportAllRecipientsToJSON returns structured recipient list", () => {
  const db = new AppDatabaseService({ isMemoryOnly: true, enableSupabase: false });
  const state = db.getState();
  const list = exportAllRecipientsToJSON(state.boys, state.girls, state.groups, "http://localhost:8080");

  assert.equal(list.length, state.girls.length + state.boys.length);
  const lanchi = list.find((item) => item.name === "Lan Chi");
  assert.ok(lanchi);
  assert.equal(lanchi?.role, "girl");
});

