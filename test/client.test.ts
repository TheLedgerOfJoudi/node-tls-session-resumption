
import {make_client} from '../src/client'

test("Client test", async () => {
  const resumption_state = await make_client(8000);
  expect(resumption_state).toBe(true);
});