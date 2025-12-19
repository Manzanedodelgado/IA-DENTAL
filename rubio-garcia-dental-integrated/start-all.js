import { spawn } from 'child_process';

console.log("🚀 Iniciando Rubio García Dental + IA Dental...");
console.log("================================================");

// Iniciar Backend (Puerto 3001)
const server = spawn('npm', ['run', 'server'], { stdio: 'inherit', shell: true });

// Iniciar Frontend (Vite)
const vite = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });

process.on('SIGINT', () => {
    console.log("\n🛑 Deteniendo servicios...");
    server.kill();
    vite.kill();
    process.exit();
});
