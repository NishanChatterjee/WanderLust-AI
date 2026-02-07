import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

export function ChatMessage({ role, content, isTyping }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex w-full gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
        isUser 
          ? "border-purple-500/30 bg-purple-500/10 text-purple-400" 
          : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
      )}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      <div className={cn(
        "relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md",
        isUser 
          ? "bg-purple-600 text-white rounded-tr-sm" 
          : "bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm glass"
      )}>
        {isTyping ? (
           <div className="flex gap-1 h-5 items-center px-1">
             <motion.span 
               className="w-1.5 h-1.5 bg-current rounded-full"
               animate={{ y: [0, -4, 0] }}
               transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
             />
             <motion.span 
               className="w-1.5 h-1.5 bg-current rounded-full"
               animate={{ y: [0, -4, 0] }}
               transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
             />
             <motion.span 
               className="w-1.5 h-1.5 bg-current rounded-full"
               animate={{ y: [0, -4, 0] }}
               transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
             />
           </div>
        ) : (
          <div className="prose prose-invert prose-sm leading-relaxed tracking-wide">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
