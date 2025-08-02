"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { subscribeToNewsletter } from '../actions/newsletterActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const NewsletterSubscription: React.FC = () => {
  const footer = useTranslations("footer");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(footer("newsletterEmailRequired"));
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);

      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        toast.success(result.message);
        setEmail(''); // Clear the form
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(footer("newsletterError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="newsletter-email" className="text-sm font-medium text-foreground">
          {footer("newsletterTitle")}
        </label>
        <div className="flex gap-2">
          <Input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={footer("newsletterPlaceholder")}
            className="flex-1"
            disabled={isLoading}
            required
            aria-describedby="newsletter-description"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
          >
            {isLoading ? footer("newsletterLoading") : footer("newsletterButton")}
          </Button>
        </div>
        <p id="newsletter-description" className="text-xs text-muted-foreground">
          {footer("newsletterDescription")}
        </p>
      </form>
    </div>
  );
};

export default NewsletterSubscription; 