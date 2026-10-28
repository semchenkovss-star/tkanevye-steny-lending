import { createFileRoute } from '@tanstack/react-router';
import Ceilings from '@/pages/Ceilings';

export const Route = createFileRoute('/ceilings')({
  component: Ceilings,
});
