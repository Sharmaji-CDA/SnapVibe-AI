export default function PrivacyPolicy() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
          Privacy Policy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Your privacy matters to us. This policy explains how <span className="text-indigo-600">SnapVibe AI</span> 
           collects, uses, and protects your information.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-slate-500">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, and account details when you sign up or contact us. We also
            collect non-personal data like browser type, device information, and
            usage patterns to improve our services.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            2. How We Use Your Information
          </h2>
          <p>
            The information we collect is used to provide, maintain, and improve
            SnapVibe AI. This includes personalizing content, responding to
            inquiries, processing downloads, and ensuring platform security.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            3. Sharing of Information
          </h2>
          <p>
            We do not sell or rent your personal data. Information may only be
            shared with trusted third-party services when required to operate
            the platform or comply with legal obligations.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            4. Data Security
          </h2>
          <p>
            We take reasonable technical and organizational measures to protect
            your data against unauthorized access, loss, or misuse. However, no
            system can guarantee complete security.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            5. Cookies & Tracking
          </h2>
          <p>
            SnapVibe AI may use cookies or similar technologies to enhance user
            experience, analyze traffic, and understand usage behavior. You can
            control cookies through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal
            information. If you wish to exercise these rights, please contact
            us.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated revision date.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            8. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle
            your data, please contact us through the Contact page.
          </p>
        </div>

        <p className="pt-6 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
