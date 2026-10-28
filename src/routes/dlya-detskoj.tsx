import { createFileRoute } from '@tanstack/react-router';
import Kids from '@/pages/Kids';

export const Route = createFileRoute('/dlya-detskoj')({
  component: Kids,
});
