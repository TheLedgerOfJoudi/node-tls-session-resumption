import { make_client } from "../src/client";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

test("Client test", async () => {
  const resumption_state = await make_client;
  console.log('res state is: ',resumption_state)
  // expect(resumption_state).resolves.toEqual(true);
  expect(resumption_state).toBe(true);
});