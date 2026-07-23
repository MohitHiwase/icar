import { register } from './server/src/modules/auth/auth.service';

async function test() {
  try {
    const res = await register({
      email: "backend_test4@geovision.io",
      password: "Password123!",
      name: "Test User"
    });
    console.log("SUCCESS:", res);
  } catch (err) {
    console.error("EXACT ERROR:", err);
  }
}

test();
