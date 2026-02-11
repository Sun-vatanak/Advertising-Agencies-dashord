<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async (event: Event) => {
  event.preventDefault()
  error.value = ''
  isLoading.value = true

  try {
    // Validate inputs
    if (!email.value || !password.value) {
      error.value = 'Please enter email and password'
      isLoading.value = false
      return
    }

    // TODO: Replace this with your actual API call
    // Example: const response = await fetch('/api/login', { ... })
    
    // For demo purposes, accepting any email/password
    // In production, validate against your backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

    // Store authentication state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', email.value)

    // Redirect to dashboard
    router.push('/')
  } catch (err) {
    error.value = 'Login failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  // TODO: Implement Google OAuth login
  console.log('Google login clicked')
  // For now, just simulate successful login
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="handleLogin">
          <FieldGroup>
            <Field>
              <FieldLabel for="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="m@example.com"
                required
                :disabled="isLoading"
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  Password
                </FieldLabel>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                id="password" 
                v-model="password"
                type="password" 
                required 
                :disabled="isLoading"
              />
            </Field>
            
            <!-- Error message -->
            <div v-if="error" class="text-sm text-red-600">
              {{ error }}
            </div>

            <Field>
              <Button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </Button>
              <Button 
                variant="outline" 
                type="button"
                :disabled="isLoading"
                @click="handleGoogleLogin"
              >
                Login with Google
              </Button>
              <FieldDescription class="text-center">
                Don't have an account?
                <a href="#">
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>