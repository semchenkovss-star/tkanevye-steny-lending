import { createFileRoute, notFound } from '@tanstack/react-router';
import BlogPost from '@/pages/BlogPost';
import { getPost } from '@/data/blog';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
    return null;
  },
  component: BlogPost,
  // Своя страница «Статья не найдена» — та же, что была, но с настоящим 404
  notFoundComponent: BlogPost,
});
