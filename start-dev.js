import { spawn } from 'child_process';

console.log('🚀 Запуск Vite Dev Server...');
const child = spawn('npm', ['run', 'dev'], { 
    stdio: 'inherit',
    shell: true 
});

child.on('error', (err) => {
    console.error('❌ Ошибка: Убедитесь, что Node.js установлен и команда npm доступна.');
});