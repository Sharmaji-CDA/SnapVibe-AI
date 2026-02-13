export default function RefundPolicy() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
          Refund & Cancellation Policy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          We aim to be fair and transparent with all purchases on <span className="text-indigo-500">SnapVibe AI</span>.
        </p>
      </div>

      <div className="space-y-10 text-slate-500">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            1. Digital Products
          </h2>
          <p>
            All purchases made on SnapVibe AI are for digital content. Once an
            image or asset has been downloaded, the purchase is generally
            non-refundable.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            2. Refund Eligibility
          </h2>
          <p>
            Refunds may be considered in cases of technical issues, duplicate
            charges, or unauthorized transactions. Each request is reviewed on
            a case-by-case basis.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            3. Cancellation
          </h2>
          <p>
            Users may cancel subscriptions (if applicable) at any time.
            Cancellation will stop future charges but does not guarantee a
            refund for prior payments.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            4. How to Request a Refund
          </h2>
          <p>
            To request a refund or report a billing issue, please contact our
            support team with your order details.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-slate-400">
            5. Processing Time
          </h2>
          <p>
            Approved refunds will be processed within 5–10 business days,
            depending on your payment provider.
          </p>
        </div>

        <p className="pt-6 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
