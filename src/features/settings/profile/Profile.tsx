export default function Profile() {
  return (
    <section className="container py-10">
      <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight text-white delay-100">
        Profile
      </h1>
      <p className="animate-fade-in-up mt-2 text-lg text-zinc-400 delay-200">
        Manage your profile information and settings.
      </p>
      <div className="animate-fade-in-up mt-6 flex items-center gap-4 delay-300">
        <div className="relative h-16 w-16 rounded-full bg-zinc-800">
          <img
            src="/path/to/avatar.jpg"
            alt="User Avatar"
            className="h-full w-full rounded-full object-cover"
          />
          <button className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs text-white">
            Edit
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">John Doe</h2>
          <p className="text-sm text-zinc-400">john.doe@example.com</p>
        </div>
      </div>
    </section>
  );
}
