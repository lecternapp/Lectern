'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown'
export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [lectureId, setLectureId] = useState('23c097df-65f1-4aa7-b013-dc23afedeb7a')
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsTyping(true)

//   useEffect(() => {
//     const getLectureId = () => {
//         setLectureId("23c097df-65f1-4aa7-b013-dc23afedeb7a")
//     }
//     getLectureId()
//   }, [])
 //UPDATE TO FETCH SUMMARY ID FROM URL
    try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/23c097df-65f1-4aa7-b013-dc23afedeb7a`, {

      const response = await fetch('http://127.0.0.1:8000/chat/23c097df-65f1-4aa7-b013-dc23afedeb7a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: input
        })
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error fetching response. Please try again.' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl h-[80vh] flex flex-col bg-white text-black">
        <ScrollArea className="flex-grow p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                 <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex flex-row items-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="mx-2 px-4 py-2 rounded-lg bg-gray-200 text-black">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <CardFooter className="border-t border-gray-300 p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-200 text-black border-none"
            />
            <Button type="submit" disabled={isTyping} className="bg-blue-500 text-white">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}