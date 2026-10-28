import { createFileRoute } from '@tanstack/react-router';
import Office from '@/pages/Office';

export const Route = createFileRoute('/dlya-ofisa')({
  component: Office,
});
