import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true, // describe, it, expect gibi global fonksiyonları kullanmak için
        setupFiles: ['./tests/setup.ts'], // Test öncesi hazırlık
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './'), // Path alias ayarı
        },
    },
})
