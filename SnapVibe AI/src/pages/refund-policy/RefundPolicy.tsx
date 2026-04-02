export default function RefundPolicy() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Refund & Cancellation Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            At <span className="text-indigo-500">CreatorVibe</span>, we aim to provide a fair and transparent experience for both creators and users.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-500">

          {/* 1 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              1. Nature of Services
            </h2>
            <p>
              CreatorVibe provides AI-powered tools and digital creator content.
              All purchases are for digital services or subscriptions, which are
              delivered instantly after payment.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              2. No Refund After Usage
            </h2>
            <p>
              Due to the nature of digital products and AI-generated content,
              refunds are not provided once the service has been used,
              content has been generated, or assets have been accessed/downloaded.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              3. Eligible Refund Cases
            </h2>
            <p>
              Refunds may be considered in limited situations:
              <br />• Duplicate or accidental payments
              <br />• Failed transactions where services were not delivered
              <br />• Verified technical issues from our side
              <br /><br />
              All refund requests are reviewed manually.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              4. Subscription Cancellation
            </h2>
            <p>
              You can cancel your subscription at any time. Cancellation will:
              <br />• Stop future billing
              <br />• Allow access until the end of the current billing cycle
              <br /><br />
              No refunds will be issued for the remaining unused period.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              5. Creator Earnings & Purchases
            </h2>
            <p>
              Payments made to access creator content or premium features are
              generally non-refundable once accessed. This ensures fairness
              for creators on the platform.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              6. How to Request a Refund
            </h2>
            <p>
              To request a refund, contact our support team with:
              <br />• Order or transaction ID
              <br />• Description of the issue
              <br /><br />
              Requests must be made within 7 days of the transaction.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              7. Processing Time
            </h2>
            <p>
              If approved, refunds will be processed within 5–10 business days,
              depending on your payment provider.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              8. Policy Updates
            </h2>
            <p>
              We may update this policy as our platform evolves. Changes will be
              reflected on this page with the updated date.
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