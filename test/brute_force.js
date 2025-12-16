import fetch from "node-fetch";
const loginURL = "http://localhost:3000/login";
async function testBruteForce() {
for (let i = 1; i <= 10; i++) {
const res = await fetch(loginURL, {
method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded" },
body: "email=fakeuser@example.com&password=fakepass"
});
console.log(`Intento ${i}: ${res.status}`);
}
}
testBruteForce();
