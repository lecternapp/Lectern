'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown'
import { Send, Square, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Custom styles for markdown content
const markdownStyles = {
  p: 'mb-4 last:mb-0 leading-7',
  h1: 'text-2xl font-bold mb-4 mt-6',
  h2: 'text-xl font-bold mb-3 mt-5',
  h3: 'text-lg font-bold mb-3 mt-4',
  ul: 'list-disc pl-6 mb-4 space-y-2 marker:text-gray-400',
  ol: 'list-decimal pl-6 mb-4 space-y-2',
  li: 'leading-7 pl-2',
  'li > p': 'mb-0',
  'li > ul': 'mt-2 mb-0',
  'li > ol': 'mt-2 mb-0',
  blockquote: 'border-l-4 border-gray-200 pl-4 mb-4 italic',
  code: 'bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm',
  pre: 'bg-gray-100 rounded-lg p-4 mb-4 overflow-x-auto',
  em: 'italic',
  strong: 'font-bold text-gray-800',
  a: 'text-blue-500 hover:underline',
  table: 'min-w-full border-collapse mb-4',
  th: 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left',
  td: 'border border-gray-300 px-4 py-2',
  hr: 'my-8 border-t border-gray-200',
  wrapper: 'space-y-4 [&>h2]:mt-8 [&>h3]:mt-6'
}

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [lectureId, setLectureId] = useState('')
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('')
  const [abortController, setAbortController] = useState(null)
  const [hasEmbedding, setHasEmbedding] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)
  
  useEffect(() => {
    // Get lecture ID from URL
    const pathParts = window.location.pathname.split('/')
    if (pathParts.length > 1) {
      setLectureId(pathParts[1])
    }
  }, [])

  useEffect(() => {
    const checkEmbedding = async () => {
      if (!lectureId) return;
      
      try {
        // First check if the embedding service is running
        const embeddingServiceCheck = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/status`);
        const embeddingServiceData = await embeddingServiceCheck.json();
        
        if (!embeddingServiceData.embedding_service_active) {
          setHasEmbedding(false);
          setIsLoading(false);
          return;
        }

        // Then check if this specific lecture has an embedding
        const response = await fetch(`/api/lectures/${lectureId}/embedding`);
        const data = await response.json();
        
        setHasEmbedding(data.hasEmbedding);
      } catch (error) {
        console.error('Error checking embedding:', error);
        setHasEmbedding(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkEmbedding();
  }, [lectureId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages, currentStreamingMessage])

  // Custom components for ReactMarkdown
  const MarkdownComponents = {
    p: ({node, ...props}) => <p className={markdownStyles.p} {...props} />,
    h1: ({node, ...props}) => <h1 className={markdownStyles.h1} {...props} />,
    h2: ({node, ...props}) => <h2 className={markdownStyles.h2} {...props} />,
    h3: ({node, ...props}) => <h3 className={markdownStyles.h3} {...props} />,
    ul: ({node, ...props}) => <ul className={markdownStyles.ul} {...props} />,
    ol: ({node, ...props}) => <ol className={markdownStyles.ol} {...props} />,
    li: ({node, children, ...props}) => {
      // Check if the list item contains nested lists
      const hasNestedList = React.Children.toArray(children).some(
        child => React.isValidElement(child) && (child.type === 'ul' || child.type === 'ol')
      );
      return (
        <li className={`${markdownStyles.li} ${hasNestedList ? 'mb-2' : ''}`} {...props}>
          {children}
        </li>
      );
    },
    blockquote: ({node, ...props}) => <blockquote className={markdownStyles.blockquote} {...props} />,
    code: ({node, inline, ...props}) => 
      inline ? (
        <code className={markdownStyles.code} {...props} />
      ) : (
        <pre className={markdownStyles.pre}>
          <code {...props} />
        </pre>
      ),
    em: ({node, ...props}) => <em className={markdownStyles.em} {...props} />,
    strong: ({node, ...props}) => <strong className={markdownStyles.strong} {...props} />,
    a: ({node, ...props}) => <a className={markdownStyles.a} target="_blank" rel="noopener noreferrer" {...props} />,
    table: ({node, ...props}) => <div className="overflow-x-auto"><table className={markdownStyles.table} {...props} /></div>,
    th: ({node, ...props}) => <th className={markdownStyles.th} {...props} />,
    td: ({node, ...props}) => <td className={markdownStyles.td} {...props} />,
    hr: ({node, ...props}) => <hr className={markdownStyles.hr} {...props} />
  }

  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsTyping(false)
      // Add the partial message to the messages array
      if (currentStreamingMessage) {
        setMessages(prev => [...prev, { role: 'assistant', content: currentStreamingMessage }])
        setCurrentStreamingMessage('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsTyping(true)
    setCurrentStreamingMessage('')

    // Create new AbortController for this request
    const controller = new AbortController()
    setAbortController(controller)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/${lectureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let finalMessage = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim())

        for (const line of lines) {
          try {
            const data = JSON.parse(line)
            if (data.chunk) {
              finalMessage += data.chunk
              setCurrentStreamingMessage(finalMessage)
            } else if (data.done) {
              setMessages(prev => [...prev, { role: 'assistant', content: finalMessage }])
              setCurrentStreamingMessage('')
              setIsTyping(false)
              setAbortController(null)
            } else if (data.error) {
              throw new Error(data.error)
            }
          } catch (e) {
            console.error('Error parsing chunk:', e)
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted')
        return
      }
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }])
      setIsTyping(false)
      setAbortController(null)
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : !hasEmbedding ? (
        <div className="flex items-center justify-center h-full p-4">
          <Alert variant="destructive" className="max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Note: Embedding Service Not Active</AlertTitle>
            <AlertDescription className="mt-2">
              <p>Some features such as chat and recommendations may be affected. Coming soon!</p>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[90%]`}>
                  <Avatar className={`w-8 h-8 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                    <AvatarFallback className={message.role === 'user' ? 'bg-blue-500' : 'bg-gray-500'}>
                      {message.role === 'user' ? 'U' : 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className={`px-4 py-2 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-black rounded-bl-none'
                    }`}
                  >
                    <ReactMarkdown 
                      components={MarkdownComponents}
                      className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2"
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {currentStreamingMessage && (
              <div className="flex justify-start mb-4">
                <div className="flex flex-row items-start max-w-[90%]">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback className="bg-gray-500">AI</AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-2 rounded-lg bg-gray-100 text-black rounded-bl-none">
                    <ReactMarkdown 
                      components={MarkdownComponents}
                      className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2"
                    >
                      {currentStreamingMessage}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
            {isTyping && !currentStreamingMessage && (
              <div className="flex justify-start mb-4">
                <div className="flex flex-row items-start">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback className="bg-gray-500">AI</AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-2 rounded-lg bg-gray-100 text-black rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <div className="sticky bottom-0 bg-white border-t p-4">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the lecture..."
                disabled={isTyping}
                className="flex-1"
              />
              {isTyping ? (
                <Button type="button" variant="outline" onClick={handleStopGeneration}>
                  <Square className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}