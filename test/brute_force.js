

const loginURL = "http://localhost:3000/login";

async function testBruteForce() {
    console.log("--- Iniciando prueba de fuerza bruta ---");
    
    for (let i = 1; i <= 10; i++) {
        try {
            const res = await fetch(loginURL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                // Enviamos credenciales falsas
                body: "email=fakeuser@example.com&password=fakepass" 
            });

            // Si el status es 429, es que el bloqueo funcionó
            if (res.status === 429) {
                console.log(`Intento ${i}: ${res.status} (BLOQUEADO)`);
            } else {
                console.log(`Intento ${i}: ${res.status} (PERMITIDO)`);
            }
        } catch (error) {
            console.error(`Error en intento ${i}:`, error.message);
        }
    }
}

testBruteForce();