"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun, Type } from "lucide-react"

/**
 * 在全局 CSS（styles/globals.css）中加入：
 *
 * :root {
 *   --safe-area-inset-bottom: env(safe-area-inset-bottom);
 * }
 * .pb-safe {
 *   padding-bottom: var(--safe-area-inset-bottom);
 * }
 */

export default function ReaderShell({
  title,
  content,
  book,
  slug,
}: {
  title: string
  content: string
  book: string
  slug: number
}) {
  const [showToolbar, setShowToolbar] = useState(false)
  const [showSliderBar, setShowSliderBar] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  const handleTap = () => {
    // 隐藏滑动条，切换工具栏显示
    setShowSliderBar(false)
    setShowToolbar((v) => !v)
  }

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      onClick={handleTap}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Header/navigation */}
      <div className="prose mx-auto p-4">
        <div className="flex justify-between mb-6">
          <Link href="/" className="text-sm text-gray-500">
            返回首页
          </Link>
          <Link href={`/${book}/${slug + 1}`} className="text-sm text-gray-500">
            下一页
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Bottom toolbar */}
      {showToolbar && (
        <div
          className="fixed bottom-0 left-0 w-full h-[50px] flex items-center justify-start gap-4 px-4
                         bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-sm z-10"
        >
          {/* 暗夜模式开关 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setDarkMode((d) => !d)
            }}
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>

          {/* 字号滑动条触发 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setShowSliderBar((s) => !s)
            }}
          >
            <Type />
          </Button>
        </div>
      )}

      {/* Slider bar */}
      {showToolbar && showSliderBar && (
        <div
          className="fixed bottom-[50px] left-0 w-full h-[50px] flex items-center justify-start gap-4 px-4
                         bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Slider
            value={[fontSize]}
            min={8}
            max={24}
            step={1}
            onValueChange={([v]) => setFontSize(v)}
            className="w-full max-w-md"
          />
          <span className="text-sm">{fontSize}px</span>
        </div>
      )}
    </div>
  )
}
