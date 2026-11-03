import { Link } from "react-router";

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-12 text-ink">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm font-semibold text-inland hover:underline">
          ← Back to Chat App
        </Link>

        <h1 className="mt-6 font-display text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink/60">Last updated: 3 November 2026</p>

        <div className="mt-8 space-y-6 leading-relaxed text-ink/80">
          <section>
            <h2 className="font-display text-xl font-bold text-ink">What we collect</h2>
            <p className="mt-2">
              Your name, email address and the messages you send. Your password is stored only
              as a secure hash, never as plain text. If you sign in with Google, we receive only
              your basic profile: name, email and profile picture.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">How we use it</h2>
            <p className="mt-2">
              To create your account, verify your email with a one-time code, and deliver your
              messages. We do not sell or share your data, and we do not show ads.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">Where it is stored</h2>
            <p className="mt-2">
              Account data and messages are stored in a MongoDB Atlas database. Your login token is
              kept in your browser's local storage. Verification emails are sent through Brevo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">Your choices</h2>
            <p className="mt-2">
              You can ask us to delete your account and messages at any time by emailing
              kapilguptakapil1111@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPage;