export default function PrivacyPolicy() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            At <span className="text-indigo-600">CreatorVibe</span>, we provide AI-powered tools
            and a platform for creators and users. This policy explains how we collect,
            use, and protect your information.
          </p>
        </div>

        <div className="space-y-10 text-slate-500">

          {/* 1 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect:
              <br />• Account data (name, email, login details)
              <br />• AI inputs & outputs (prompts, generated content)
              <br />• Creator content (uploads, posts, media)
              <br />• Profile data (bio, images, preferences)
              <br />• Usage data (activity, interactions, features used)
              <br />• Device & browser information
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              2. How We Use Your Data
            </h2>
            <p>
              We use your data to:
              <br />• Provide AI generation features
              <br />• Enable content creation and publishing
              <br />• Personalize user experience
              <br />• Improve platform performance
              <br />• Ensure security and prevent abuse
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              3. Creator & User Content
            </h2>
            <p>
              • Creators retain ownership of their content.
              <br />
              • Users can view and interact with publicly shared content.
              <br />
              • By publishing content, you allow us to display and distribute it within the platform.
              <br />
              • Private content remains accessible only to you unless shared.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              4. AI Processing
            </h2>
            <p>
              Inputs such as prompts, text, or media are processed by AI systems
              to generate outputs. We do not use your private content for external
              training without your permission.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              5. Data Sharing
            </h2>
            <p>
              We do not sell your personal data. We may share data with trusted
              services (hosting, analytics, authentication) only to operate the platform.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              6. Cookies & Tracking
            </h2>
            <p>
              We use cookies to:
              <br />• Maintain login sessions
              <br />• Analyze usage behavior
              <br />• Improve features and performance
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              7. Data Security
            </h2>
            <p>
              We use industry-standard security practices to protect your data.
              However, no system is completely secure.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              8. Your Rights
            </h2>
            <p>
              You can:
              <br />• Access your data
              <br />• Update your profile
              <br />• Delete your account and content
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this policy. Changes will be posted here with an updated date.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              10. Contact Us
            </h2>
            <p>
              For questions, contact us via the platform or support email.
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
