export default function TermsAndConditions() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
          Terms & Conditions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Please read these terms carefully before using <span className="text-indigo-500">SnapVibe AI</span>.
        </p>
      </div>

      <div className="space-y-10 text-slate-500">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SnapVibe AI, you agree to be bound by these
            Terms & Conditions. If you do not agree, please do not use the
            platform.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            2. Use of the Platform
          </h2>
          <p>
            You agree to use SnapVibe AI only for lawful purposes. Any misuse,
            unauthorized distribution, or violation of intellectual property
            rights is strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            3. Accounts & Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and all activities under your account.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            4. Content & Licenses
          </h2>
          <p>
            All images and content available on SnapVibe AI are protected by
            applicable copyright and license terms. Usage rights may vary per
            image.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            5. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms without prior notice.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            6. Limitation of Liability
          </h2>
          <p>
            <span className="font-medium text-indigo-500">SnapVibe AI</span> shall not be liable for any indirect or consequential
            damages arising from the use of the platform.
          </p>
        </div>

        <p className="pt-6 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
