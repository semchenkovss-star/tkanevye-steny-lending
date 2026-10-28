import { createFileRoute } from '@tanstack/react-router';
import Panels from '@/pages/Panels';

export const Route = createFileRoute('/panels')({
  component: Panels,
});
