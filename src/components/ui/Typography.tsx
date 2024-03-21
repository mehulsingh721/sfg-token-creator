"use client";
import { ReactNode } from "react";

interface textType {
  children: ReactNode;
  className?: String;
}

export function Heading1({ children }: textType) {
  return (
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
      {children}
    </h1>
  );
}
export function Heading2({ children }: textType) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}
export function Heading3({ children }: textType) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}
export function Heading4({ children }: textType) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}
export function Heading5({ children, className }: textType) {
  return <h1 className={`text-xl ${className}`}>{children}</h1>;
}
export function Heading6({ children, className }: textType) {
  return <h1 className={`text-lg ${className}`}>{children}</h1>;
}
export function Text({ children, className }: textType) {
  return <span className={`text-base ${className}`}>{children}</span>;
}
