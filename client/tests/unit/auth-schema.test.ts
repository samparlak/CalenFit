import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/lib/validations/auth'

describe('Auth Validation Schemas', () => {
    describe('Login Schema', () => {
        it('should validate correct inputs', () => {
            const result = loginSchema.safeParse({
                email: 'test@example.com',
                password: 'Password123'
            })
            expect(result.success).toBe(true)
        })

        it('should fail on invalid email', () => {
            const result = loginSchema.safeParse({
                email: 'invalid-email',
                password: 'Password123'
            })
            expect(result.success).toBe(false)
        })

        it('should fail on empty fields', () => {
            const result = loginSchema.safeParse({
                email: '',
                password: ''
            })
            expect(result.success).toBe(false)
        })
    })

    describe('Register Schema', () => {
        it('should validate correct inputs', () => {
            const result = registerSchema.safeParse({
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123',
                termsAccepted: true
            })
            expect(result.success).toBe(true)
        })

        it('should fail if password is too short', () => {
            const result = registerSchema.safeParse({
                fullName: 'John Doe',
                email: 'john@example.com',
                password: '123',
                termsAccepted: true
            })
            expect(result.success).toBe(false)
        })

        it('should fail if terms not accepted', () => {
            const result = registerSchema.safeParse({
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123',
                termsAccepted: false
            })
            expect(result.success).toBe(false)
        })

        it('should fail if full name is too short', () => {
            const result = registerSchema.safeParse({
                fullName: 'Jo',
                email: 'john@example.com',
                password: 'Password123',
                termsAccepted: true
            })
            expect(result.success).toBe(false)
        })
    })
})
