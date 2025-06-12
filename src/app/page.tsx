"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

const books = [{ id: "jiaoguangangzong", title: "教观纲宗" }]

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-2xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">📚 佛经阅读</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">暗夜模式</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4">可阅读书籍</h2>
          <ul className="grid gap-4">
            {books.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/${book.id}/1`}
                  className="block p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                >
                  <div className="font-medium text-lg">{book.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
