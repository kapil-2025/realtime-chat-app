function AuthLayout({ children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-inland p-12 text-white lg:flex">
        <p className="font-display text-2xl font-extrabold">Chat App</p>
        <div>
          <h2 className="font-display text-5xl font-extrabold leading-tight">
            Baatein jo <br />
            turant pahunchein.
          </h2>
          <div className="mt-10 flex max-w-sm flex-col gap-3">
            <p className="w-fit rounded-2xl rounded-bl-sm bg-white/15 px-4 py-2.5">
              Kal class aa raha hai?
            </p>
            <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-marigold px-4 py-2.5 text-ink">
              Haan, 9 baje milte hain ✓✓
            </p>
          </div>
        </div>
        <p className="text-sm text-white/70">
          Doston se karo baat, bina rukaawat ke.
        </p>
      </aside>
      <main className="flex min-h-screen flex-col justify-center px-6 sm:px-16 py-12 lg:items-center ">
        <p className="mb-10 font-display text-2xl font-extrabold text-inland lg:hidden">
          Chat App
        </p>
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
export default AuthLayout;
