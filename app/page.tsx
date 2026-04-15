"use client";
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';
import { DashboardContent } from '@/components/dashboard-content';

export default function Home() {
  return (
    <AuthProvider>
      <AppShell>
        <DashboardContent />
      </AppShell>
    </AuthProvider>
  );
}

