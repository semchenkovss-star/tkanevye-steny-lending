import { createFileRoute } from '@tanstack/react-router';
import Hotel from '@/pages/Hotel';

export const Route = createFileRoute('/dlya-gostinicy')({
  component: Hotel,
});
