import { make_client } from "../src/client";
import {resume_session} from "../src/resumer"

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Client test", () => {
  it("should resume a session", async () => {
    const resumption_state = await resume_session;
    expect(resumption_state).toBe(true);
  })
});