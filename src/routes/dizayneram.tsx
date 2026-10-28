import { createFileRoute } from '@tanstack/react-router';
import Designers from '@/pages/Designers';

export const Route = createFileRoute('/dizayneram')({
  component: Designers,
});
