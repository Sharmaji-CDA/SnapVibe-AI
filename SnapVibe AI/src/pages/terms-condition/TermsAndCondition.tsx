export default function TermsAndConditions() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Terms & Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Please read these terms carefully before using{" "}
            <span className="text-indigo-500">CreatorVibe</span>.
          </p>
        </div>

        <div className="space-y-10 text-slate-500">

          {/* 1 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using CreatorVibe, you agree to be bound by these
              Terms & Conditions. If you do not agree, you must not use the platform.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              2. Platform Overview
            </h2>
            <p>
              CreatorVibe is an AI-powered platform that enables users to generate
              content and allows creators to publish and share content with others.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              3. User Responsibilities
            </h2>
            <p>
              You agree to:
              <br />• Use the platform only for lawful purposes
              <br />• Not upload harmful, illegal, or infringing content
              <br />• Not misuse AI tools or attempt to exploit the system
              <br />• Respect other users and creators
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              4. Accounts & Security
            </h2>
            <p>
              You are responsible for maintaining your account credentials.
              Any activity under your account is your responsibility.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              5. Creator Content & Ownership
            </h2>
            <p>
              Creators retain ownership of the content they upload or generate.
              By publishing content, you grant CreatorVibe a license to host,
              display, and distribute it within the platform.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              6. AI-Generated Content
            </h2>
            <p>
              AI-generated content is provided "as is". We do not guarantee accuracy,
              originality, or suitability. Users are responsible for how they use
              generated content.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              7. Payments & Subscriptions
            </h2>
            <p>
              Certain features may require payment or subscription.
              By purchasing, you agree to our Refund Policy.
              Fees are non-refundable except as stated in the policy.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              8. Prohibited Activities
            </h2>
            <p>
              You must not:
              <br />• Violate any laws or regulations
              <br />• Upload copyrighted or stolen content
              <br />• Attempt to hack, reverse engineer, or disrupt the platform
              <br />• Abuse or harass other users
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              9. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms, without prior notice.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              10. Limitation of Liability
            </h2>
            <p>
              CreatorVibe is not liable for any indirect, incidental, or consequential
              damages resulting from the use of the platform.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              11. Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              platform means you accept the updated terms.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              12. Contact
            </h2>
            <p>
              For any questions regarding these Terms, please contact us through
              the platform or support email.
            </p>
          </div>

          <p className="pt-6 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

        </div>
      </div>
    </section>
  );
}