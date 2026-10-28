import { createFileRoute } from '@tanstack/react-router';
import Textile from '@/pages/Textile';

export const Route = createFileRoute('/arhitekturnyj-tekstil')({
  component: Textile,
});
