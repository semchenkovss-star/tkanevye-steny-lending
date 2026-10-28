import { createFileRoute } from '@tanstack/react-router';
import LivingRoom from '@/pages/LivingRoom';

export const Route = createFileRoute('/dlya-gostinoj')({
  component: LivingRoom,
});
