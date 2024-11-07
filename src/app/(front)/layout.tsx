import React , { ReactNode } from 'react';

export default function FrontLayout({ children }: {
  children: ReactNode }) {
    return <div>{ children }</div>;
}
