"use client";
import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ClientPortalProps {
  children: ReactNode;
  selector?: string;
}

export default function ClientPortal({
  children,
  selector = "body",
}: ClientPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const targetElement = document.querySelector(selector);
  return targetElement ? createPortal(children, targetElement) : null;
}
