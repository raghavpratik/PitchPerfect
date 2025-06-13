import { NewsTabs } from "@/components/news/NewsTabs";

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Stay Updated</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Catch the latest buzz from the startup world, financial markets, funding announcements, and tech innovations.
        </p>
      </div>
      <NewsTabs />
    </div>
  );
}
