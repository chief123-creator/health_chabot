import { useState, useRef } from "react";
import { Upload, Image, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        animate={{
          scale: dragActive ? 1.02 : 1,
          borderColor: dragActive ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors",
          dragActive
            ? "bg-primary/5"
            : "hover:border-primary/50 hover:bg-muted/50",
          isLoading && "pointer-events-none opacity-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={isLoading}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative p-4"
            >
              <motion.img
                src={preview}
                alt="Medicine preview"
                className="max-h-[160px] rounded-lg object-contain shadow-soft"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground shadow-soft hover:bg-destructive/90"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-3 p-6 text-center"
            >
              <motion.div
                animate={
                  dragActive && !prefersReducedMotion
                    ? { scale: [1, 1.1, 1], y: [0, -5, 0] }
                    : undefined
                }
                transition={{ duration: 0.5, repeat: dragActive ? Infinity : 0 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
              >
                <Upload className="h-7 w-7 text-primary" />
              </motion.div>
              <div>
                <p className="font-medium text-foreground">Upload medicine image</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drag & drop or click to select
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Image className="h-4 w-4" />
                <span>JPG, PNG, WEBP up to 10MB</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
            >
              <Button
                onClick={handleSubmit}
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Search Medicine
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
