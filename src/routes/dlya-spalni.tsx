import { createFileRoute } from '@tanstack/react-router';
import Bedroom from '@/pages/Bedroom';

export const Route = createFileRoute('/dlya-spalni')({
  component: Bedroom,
});
