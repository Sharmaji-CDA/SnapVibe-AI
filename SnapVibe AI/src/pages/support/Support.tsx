import Button from "../../components/ui/Button";

export default function Support() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Support Center
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Need help with <span className="text-indigo-600">CreatorVibe</span>? 
            We’re here to support both creators and users.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* Account */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🔐 Account & Login
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Trouble signing in, managing your profile, or account security?
            </p>
            <p className="text-sm text-slate-500">
              Recover access, update details, and manage your account easily.
            </p>
          </div>

          {/* AI */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🤖 AI Generation Issues
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Facing issues with prompts, outputs, or AI-generated content?
            </p>
            <p className="text-sm text-slate-500">
              Learn how to get better results and fix common generation problems.
            </p>
          </div>

          {/* Creator */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🎨 Creator Support
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Need help publishing content, growing audience, or monetizing?
            </p>
            <p className="text-sm text-slate-500">
              Tools and guidance to help creators succeed on the platform.
            </p>
          </div>

          {/* Billing */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              💳 Payments & Billing
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Issues with subscriptions, payments, or refunds?
            </p>
            <p className="text-sm text-slate-500">
              We’ll help resolve billing concerns quickly and securely.
            </p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              📄 Content & Usage
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Questions about using generated or creator content?
            </p>
            <p className="text-sm text-slate-500">
              Understand rights, licenses, and proper usage guidelines.
            </p>
          </div>

          {/* Safety */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              ⚠️ Safety & Reporting
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Found inappropriate or harmful content?
            </p>
            <p className="text-sm text-slate-500">
              Report issues and help us maintain a safe platform.
            </p>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-slate-500">

            <div>
              <h4 className="font-semibold text-slate-800">
                How do I generate content using AI?
              </h4>
              <p className="mt-1 text-sm">
                Enter your prompt, customize settings, and generate content instantly
                using our AI tools.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800">
                Can I use generated content commercially?
              </h4>
              <p className="mt-1 text-sm">
                Usage rights depend on the content and plan. Please review terms
                before commercial use.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800">
                How do I become a creator?
              </h4>
              <p className="mt-1 text-sm">
                Create an account and start publishing content directly from your dashboard.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800">
                How do I cancel my subscription?
              </h4>
              <p className="mt-1 text-sm">
                You can cancel anytime from your account settings. Access continues
                until the billing cycle ends.
              </p>
            </div>

          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-2xl border bg-white p-10 text-center shadow-lg">
          <h3 className="text-2xl font-semibold text-slate-900">
            Still need help?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            If you couldn’t find what you’re looking for, our support team is ready to assist you.
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => window.location.href = "/contact"}
              label="Contact Support"
            />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Average response time: within 24 hours
          </p>
        </div>

      </div>
    </section>
  );
}