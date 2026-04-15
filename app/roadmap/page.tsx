"use client";
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';
import { CertRoadmap } from '@/components/cert-roadmap';

export default function RoadmapPage() {
  return (
    <AuthProvider>
      <AppShell>
        <CertRoadmap />
      </AppShell>
    </AuthProvider>
  );
}

