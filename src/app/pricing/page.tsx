import { PricingTiers } from '@/components/pricing/PricingTiers';
import { PaymentPlaceholder } from '@/components/pricing/PaymentPlaceholder';

export default function PricingPage() {
  return (
    <div className="space-y-16 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Flexible Plans for Everyone</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're a founder ready to showcase your startup or an investor looking for the next big thing, we have a plan for you.
        </p>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-10">Founder & Investor Plans</h2>
        <PricingTiers />
      </section>

      <section className="pt-8 border-t">
        <h2 className="text-3xl font-bold font-headline text-center mb-10">Make a Placeholder Investment</h2>
        <PaymentPlaceholder />
      </section>
    </div>
  );
}
