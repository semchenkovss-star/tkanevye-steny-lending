import { createFileRoute } from '@tanstack/react-router';
import Restaurant from '@/pages/Restaurant';

export const Route = createFileRoute('/dlya-restorana')({
  component: Restaurant,
});
