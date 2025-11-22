const fs = require('fs');
const path = require('path');

console.log('--- Environment Variable Diagnostic ---');

// 1. Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file found at:', envPath);

    // 2. Read raw content
    const rawContent = fs.readFileSync(envPath, 'utf8');
    console.log('File content length:', rawContent.length);

    // 3. Simple manual parse
    console.log('\n--- Manual Parsing ---');
    const lines = rawContent.split('\n');
    const vars = {};

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const parts = trimmed.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            vars[key] = value;
            console.log(`Line ${index + 1}: Found key '${key}' with value length ${value.length}`);
        }
    });

    // 4. Check specific required keys
    console.log('\n--- Validation ---');
    const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
    required.forEach(key => {
        if (!vars[key]) {
            console.log(`❌ Missing required key: ${key}`);
        } else {
            console.log(`✅ Found ${key}`);
        }
    });

} else {
    console.log('❌ .env.local file NOT found at:', envPath);
}
console.log('---------------------------------------');
