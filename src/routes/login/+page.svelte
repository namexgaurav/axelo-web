<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onDestroy } from 'svelte';
  import { sendEmailOtp, sendPhoneOtp, verifyEmailOtp, verifyPhoneOtp } from '$lib/auth/auth.service';
  import { Mail, Phone, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-svelte';

  export let data;

  let mode: 'email' | 'phone' = 'email';
  let step: 'request' | 'verify' = 'request';

  // Form states
  let email = '';
  let countryCode = '+91';
  let phoneNumber = '';
  let fullName = '';
  let otpToken = '';

  // UI states
  let loading = false;
  let errorMessage = '';
  let successMessage = '';
  let resendCountdown = 0;
  let resendTimer: NodeJS.Timeout | null = null;

  $: supabase = page.data.supabase;
  $: redirectTo = data?.redirectTo || '/account';

  const countryCodes = [
    { code: '+91', country: 'IN', label: 'India (+91)' },
    { code: '+1', country: 'US', label: 'USA / Canada (+1)' },
    { code: '+44', country: 'UK', label: 'UK (+44)' },
    { code: '+65', country: 'SG', label: 'Singapore (+65)' },
    { code: '+971', country: 'AE', label: 'UAE (+971)' },
    { code: '+49', country: 'DE', label: 'Germany (+49)' },
    { code: '+81', country: 'JP', label: 'Japan (+81)' },
    { code: '+61', country: 'AU', label: 'Australia (+61)' }
  ];

  function startResendTimer() {
    resendCountdown = 60;
    if (resendTimer) clearInterval(resendTimer);
    resendTimer = setInterval(() => {
      if (resendCountdown > 0) {
        resendCountdown--;
      } else {
        if (resendTimer) clearInterval(resendTimer);
      }
    }, 1000);
  }

  onDestroy(() => {
    if (resendTimer) clearInterval(resendTimer);
  });

  async function handleSendOtp() {
    errorMessage = '';
    successMessage = '';
    loading = true;

    try {
      if (mode === 'email') {
        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@')) {
          errorMessage = 'Please enter a valid email address.';
          loading = false;
          return;
        }

        const { error } = await sendEmailOtp(supabase, cleanEmail);
        if (error) {
          errorMessage = error.message || 'Failed to send verification code. Please check your Supabase Auth settings.';
        } else {
          step = 'verify';
          successMessage = `Verification code sent to ${cleanEmail}`;
          startResendTimer();
        }
      } else {
        const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
        if (!cleanPhone || cleanPhone.length < 7) {
          errorMessage = 'Please enter a valid phone number.';
          loading = false;
          return;
        }

        const fullPhone = `${countryCode}${cleanPhone}`;
        const { error } = await sendPhoneOtp(supabase, fullPhone);
        if (error) {
          errorMessage = error.message || 'SMS delivery requires a configured SMS provider (Twilio/MessageBird) in Supabase Auth.';
        } else {
          step = 'verify';
          successMessage = `Verification code sent to ${fullPhone}`;
          startResendTimer();
        }
      }
    } catch (err: any) {
      errorMessage = err.message || 'Network request failed. Please check your connection.';
    } finally {
      loading = false;
    }
  }

  async function handleVerifyOtp() {
    errorMessage = '';
    loading = true;

    try {
      const cleanToken = otpToken.trim();
      if (!cleanToken || cleanToken.length < 6) {
        errorMessage = 'Please enter the complete 6-digit verification code.';
        loading = false;
        return;
      }

      if (mode === 'email') {
        const { error } = await verifyEmailOtp(supabase, email.trim().toLowerCase(), cleanToken);
        if (error) {
          errorMessage = error.message || 'Invalid or expired verification code. Please try again.';
        } else {
          successMessage = 'Successfully authenticated! Redirecting...';
          setTimeout(() => {
            goto(redirectTo, { invalidateAll: true });
          }, 800);
        }
      } else {
        const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
        const fullPhone = `${countryCode}${cleanPhone}`;
        const { error } = await verifyPhoneOtp(supabase, fullPhone, cleanToken);
        if (error) {
          errorMessage = error.message || 'Invalid or expired verification code. Please try again.';
        } else {
          successMessage = 'Successfully authenticated! Redirecting...';
          setTimeout(() => {
            goto(redirectTo, { invalidateAll: true });
          }, 800);
        }
      }
    } catch (err: any) {
      errorMessage = err.message || 'Verification failed. Please try again.';
    } finally {
      loading = false;
    }
  }

  function handleReset() {
    step = 'request';
    otpToken = '';
    errorMessage = '';
    successMessage = '';
  }
</script>

<svelte:head>
  <title>Sign In & Customer Portal | AXELO</title>
</svelte:head>

<section class="min-h-[85vh] pt-32 pb-20 px-5 sm:px-8 flex items-center justify-center bg-axelo-neutral/30">
  <div class="w-full max-w-md bg-white border border-axelo-border rounded-xl shadow-subtle p-8 sm:p-10 relative">
    
    <!-- Header Mark & Title -->
    <div class="text-center mb-8">
      <div class="inline-flex w-10 h-10 bg-axelo-dark rounded-lg items-center justify-center mb-3">
        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
          <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-axelo-dark uppercase">
        AXELO ACCOUNT
      </h1>
      <p class="text-xs text-axelo-muted mt-1.5 font-mono">
        DEFINE YOUR OWN POWER // SECURE AUTH
      </p>
    </div>

    <!-- Feedback Alerts -->
    {#if errorMessage}
      <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-start gap-3 animate-fadeIn">
        <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p class="font-medium">Authentication Notice</p>
          <p class="mt-0.5 leading-relaxed text-red-600">{errorMessage}</p>
        </div>
      </div>
    {/if}

    {#if successMessage}
      <div class="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3 animate-fadeIn">
        <CheckCircle2 class="w-4 h-4 shrink-0 text-emerald-600" />
        <span>{successMessage}</span>
      </div>
    {/if}

    <!-- STEP 1: Method Selector & Input -->
    {#if step === 'request'}
      <!-- Segmented Toggle -->
      <div class="grid grid-cols-2 p-1 bg-axelo-neutral rounded-lg border border-axelo-border/70 mb-6 text-xs font-medium">
        <button
          type="button"
          class="flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-200 {mode === 'email' ? 'bg-white text-axelo-dark shadow-sm font-semibold' : 'text-axelo-muted hover:text-axelo-dark'}"
          on:click={() => { mode = 'email'; errorMessage = ''; }}
        >
          <Mail class="w-3.5 h-3.5" />
          <span>Email Address</span>
        </button>
        <button
          type="button"
          class="flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-200 {mode === 'phone' ? 'bg-white text-axelo-dark shadow-sm font-semibold' : 'text-axelo-muted hover:text-axelo-dark'}"
          on:click={() => { mode = 'phone'; errorMessage = ''; }}
        >
          <Phone class="w-3.5 h-3.5" />
          <span>Mobile Phone</span>
        </button>
      </div>

      <form on:submit|preventDefault={handleSendOtp} class="space-y-4">
        {#if mode === 'email'}
          <div>
            <label for="email" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              bind:value={email}
              required
              placeholder="developer@studio.axelo"
              class="w-full px-4 py-3 rounded-lg border border-axelo-border bg-white text-sm text-axelo-dark placeholder:text-axelo-muted/60 focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
            />
          </div>
        {:else}
          <div>
            <label for="phone" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
              Mobile Phone
            </label>
            <div class="flex gap-2">
              <select
                bind:value={countryCode}
                class="px-3 py-3 rounded-lg border border-axelo-border bg-white text-xs text-axelo-dark focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
              >
                {#each countryCodes as c}
                  <option value={c.code}>{c.label}</option>
                {/each}
              </select>
              <input
                id="phone"
                type="tel"
                bind:value={phoneNumber}
                required
                placeholder="98765 43210"
                class="flex-1 px-4 py-3 rounded-lg border border-axelo-border bg-white text-sm text-axelo-dark placeholder:text-axelo-muted/60 focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
              />
            </div>
            <p class="text-[11px] text-axelo-muted mt-1.5 font-mono">
              Country code default is India (+91)
            </p>
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading}
          class="w-full mt-2 py-3.5 px-6 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {#if loading}
            <RefreshCw class="w-4 h-4 animate-spin" />
            <span>Sending Verification Code...</span>
          {:else}
            <span>Send Verification Code</span>
            <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          {/if}
        </button>
      </form>
    {/if}

    <!-- STEP 2: Verify OTP -->
    {#if step === 'verify'}
      <div class="space-y-5">
        <div class="p-3.5 rounded-lg bg-axelo-neutral border border-axelo-border/70 flex items-center justify-between text-xs">
          <div class="truncate mr-2">
            <span class="text-axelo-muted block text-[10px] font-mono uppercase">Code Sent To</span>
            <span class="font-medium text-axelo-dark truncate font-mono">
              {mode === 'email' ? email : `${countryCode} ${phoneNumber}`}
            </span>
          </div>
          <button
            type="button"
            on:click={handleReset}
            class="text-axelo-blue hover:underline text-xs font-medium shrink-0 flex items-center gap-1"
          >
            <ArrowLeft class="w-3 h-3" />
            <span>Change</span>
          </button>
        </div>

        <form on:submit|preventDefault={handleVerifyOtp} class="space-y-4">
          <div>
            <label for="otp" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5 text-center">
              Enter 6-Digit One-Time Code
            </label>
            <input
              id="otp"
              type="text"
              bind:value={otpToken}
              maxlength="6"
              pattern="[0-9]{6}"
              required
              placeholder="000000"
              autocomplete="one-time-code"
              class="w-full px-4 py-3.5 text-center tracking-[0.5em] text-2xl font-mono font-bold rounded-lg border border-axelo-border bg-white text-axelo-dark focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otpToken.length < 6}
            class="w-full py-3.5 px-6 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {#if loading}
              <RefreshCw class="w-4 h-4 animate-spin" />
              <span>Verifying Token...</span>
            {:else}
              <span>Verify & Continue</span>
              <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            {/if}
          </button>

          <!-- Resend Countdown -->
          <div class="text-center pt-2">
            {#if resendCountdown > 0}
              <p class="text-xs text-axelo-muted font-mono">
                Resend code in <span class="font-semibold text-axelo-dark">{resendCountdown}s</span>
              </p>
            {:else}
              <button
                type="button"
                on:click={handleSendOtp}
                disabled={loading}
                class="text-xs font-mono text-axelo-blue hover:underline font-medium inline-flex items-center gap-1.5"
              >
                <RefreshCw class="w-3 h-3" />
                <span>Resend Verification Code</span>
              </button>
            {/if}
          </div>
        </form>
      </div>
    {/if}

    <!-- Security & Trust Note -->
    <div class="mt-8 pt-6 border-t border-axelo-border/70 text-center">
      <p class="text-[11px] text-axelo-muted leading-relaxed font-sans">
        Protected by Supabase Authentication & Row-Level Security. We do not store or transmit plaintext passwords.
      </p>
    </div>
  </div>
</section>
