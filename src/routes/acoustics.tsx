import { createFileRoute } from '@tanstack/react-router';
import Acoustics from '@/pages/Acoustics';

export const Route = createFileRoute('/acoustics')({
  component: Acoustics,
});
