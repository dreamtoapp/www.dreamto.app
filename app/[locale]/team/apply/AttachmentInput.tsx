import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

interface AttachmentInputProps {
  onFileChange: (file: File | null) => void;
}

export default function AttachmentInput({ onFileChange }: AttachmentInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3 mt-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
        onChange={e => onFileChange(e.target.files?.[0] || null)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Attach file"
      >
        <Paperclip className="w-4 h-4" />
        Attach CV / Portfolio
      </Button>
      <span className="text-xs text-muted-foreground">
        {fileInputRef.current?.files?.[0]?.name || "No file chosen"}
      </span>
    </div>
  );
}
