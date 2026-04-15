"use client";
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';
import { SettingsContent } from '@/components/settings-content';

export default function SettingsPage() {
  return (
    <AuthProvider>
      <AppShell>
        <SettingsContent />
      </AppShell>
    </AuthProvider>
  );
}

