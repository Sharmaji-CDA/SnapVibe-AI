import Button from "../../components/common/Button";

export default function Support() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
          Support
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Need help? We’re here to make your <span className="text-indigo-600">SnapVibe AI</span> experience smooth and
          stress-free.
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-slate-800">
            Account & Login
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Trouble signing in, updating your profile, or managing your
            account?
          </p>
          <p className="text-sm text-slate-500">
            We can help you recover access and manage your settings.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-slate-800">
            Downloads & Licenses
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Questions about image downloads, usage rights, or licenses?
          </p>
          <p className="text-sm text-slate-500">
            Learn how you can use SnapVibe AI visuals safely and fairly.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-slate-800">
            Payments & Billing
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Issues with payments, subscriptions, or creator earnings?
          </p>
          <p className="text-sm text-slate-500">
            We’ll help resolve billing concerns quickly.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-slate-300">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 text-slate-500">
          <div>
            <h4 className="font-semibold text-slate-400">
              How do I download images?
            </h4>
            <p className="mt-1 text-sm">
              Simply open an image, click the download button, and choose your
              preferred resolution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-400">
              Can I use images commercially?
            </h4>
            <p className="mt-1 text-sm">
              Usage rights depend on the image license. Please review the image
              details before commercial use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-400">
              How do I become a creator?
            </h4>
            <p className="mt-1 text-sm">
              Sign up for an account and apply as a creator from your profile
              dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900">
          Still need help?
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          If you couldn’t find what you were looking for, our support team is
          ready to assist you.
        </p>

        <div className="mt-6 flex justify-center">
          <Button onClick={() => window.location.href = "/contact"} label="Contact Support" />
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Average response time: within 24 hours
        </p>
      </div>
    </section>
  );
}
