"use client";
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';
import { ChatStudio } from '@/components/chat-studio';

export default function ChatPage() {
  return (
    <AuthProvider>
      <AppShell>
        <ChatStudio />
      </AppShell>
    </AuthProvider>
  );
}

