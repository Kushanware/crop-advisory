"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages, Check } from "lucide-react"
import { useLanguage, SUPPORTED_LANGUAGES } from "@/contexts/LanguageContext"

export function LanguageSelector() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  
  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLang?.nativeName || 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-sm text-muted-foreground">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}