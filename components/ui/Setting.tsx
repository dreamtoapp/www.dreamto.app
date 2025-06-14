"use client"
import React from 'react'
import { Dialog, DialogTrigger } from './dialog'
import { Settings, Settings2Icon } from 'lucide-react'
import { DialogContent } from './dialog'
import { DialogHeader } from './dialog'
import { DialogTitle } from './dialog'
import LangSwitcher from '../naviqation/LangSwicher'
import ThemeSwitch from '../naviqation/ThemeSwitch'
import { FaWhatsapp } from 'react-icons/fa'
import { AtSign } from 'lucide-react'
import Link from '../link'

function Setting() {
  return (
    <div className="flex flex-row items-center gap-2" >
         
          <Link
            href="https://wa.me/+966554113107"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-md transition-all duration-200 ease-in-out text-[#25D366] hover:bg-accent"
          >
            <FaWhatsapp className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:dreamtoapp@gmail.com"
            className="flex items-center rounded-md transition-all duration-200 ease-in-out hover:bg-accent"
          >
            <AtSign className="w-5 h-5" />
          </Link>
        
    
    <Dialog>
    <DialogTrigger asChild>
      <button
        className="rounded-full p-2 hover:bg-accent transition-colors focus:outline-none"
        aria-label="Settings"
        type="button"
      >
        <Settings2Icon  className="w-5 h-5 text-foreground" />
      </button>
    </DialogTrigger>
    <DialogContent className="bg-background/95 border border-border shadow-xl rounded-xl p-6 max-w-sm w-full">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold mb-4">Settings</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-medium text-muted-foreground">Language</span>
          <LangSwitcher />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-medium text-muted-foreground">Theme</span>
          <ThemeSwitch />
        </div>
        
      </div>
    </DialogContent>
  </Dialog>
  </div>
  )
}

export default Setting