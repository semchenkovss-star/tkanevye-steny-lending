import { createFileRoute } from '@tanstack/react-router';
import HomeCinema from '@/pages/HomeCinema';

export const Route = createFileRoute('/domashnij-kinoteatr')({
  component: HomeCinema,
});
