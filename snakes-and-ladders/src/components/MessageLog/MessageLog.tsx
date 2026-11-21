import { useEffect, useRef } from 'react';
import type { LogMessage } from '../../game/types';
import styles from './MessageLog.module.css';

interface MessageLogProps {
  messages: LogMessage[];
}

export function MessageLog({ messages }: MessageLogProps) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section aria-label="Game log">
      <h2 className={styles.title}>Game log</h2>
      <ol ref={ref} className={styles.log} role="log" aria-live="polite" tabIndex={0}>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ol>
    </section>
  );
}
