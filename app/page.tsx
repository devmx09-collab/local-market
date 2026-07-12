        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((c) => (
            <button
              key={c}
              className="rounded-2xl border bg-white px-4 py-5 text-left text-sm font-medium hover:bg-zinc-100"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Newest nearby</h2>
          <button className="text-sm text-zinc-600">See all</button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {listings.map((item, i) => (
            <article
              key={i}
              className="rounded-3xl border bg-white p-5 shadow-sm"
            >
              <div className="mb-3 aspect-[4/3] rounded-2xl bg-zinc-200" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.area}</p>
                </div>
                <div className="font-bold">{item.price}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-4 text-center text-sm text-zinc-500">
          Sponsored listing slot
        </div>
      </section>
    </main>
  );
}
