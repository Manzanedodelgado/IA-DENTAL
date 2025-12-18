import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatContact, ChatMessage } from '../../../types';
import { ChatPanel, ContactsList } from '../Communication';

// Mock contacts
const MOCK_CONTACTS: ChatContact[] = [
    {
        id: '1',
        name: 'María García',
        phone: '+34 600 111 222',
        lastMessage: '¿A qué hora es mi cita?',
        lastMessageTime: new Date(Date.now() - 3600000),
        unreadCount: 2,
        avatar: 'MG'
    },
    {
        id: '2',
        name: 'Juan Pérez',
        phone: '+34 600 333 444',
        lastMessage: 'Muchas gracias',
        lastMessageTime: new Date(Date.now() - 7200000),
        unreadCount: 0,
        avatar: 'JP'
    },
    {
        id: '3',
        name: 'Ana López',
        phone: '+34 600 555 666',
        lastMessage: 'Ok, perfecto',
        lastMessageTime: new Date(Date.now() - 86400000),
        unreadCount: 0,
        avatar: 'AL'
    }
];

const Communication: React.FC = () => {
    const [selectedContact, setSelectedContact] = useState<ChatContact | null>(MOCK_CONTACTS[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

    // Messages for selected contact
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: 'contact',
            text: '¿A qué hora es mi cita del viernes?',
            timestamp: new Date(Date.now() - 3700000)
        },
        {
            id: '2',
            sender: 'user',
            text: 'Hola María, tu cita es el viernes a las 10:30 AM',
            timestamp: new Date(Date.now() - 3600000)
        },
        {
            id: '3',
            sender: 'contact',
            text: 'Perfecto, muchas gracias 😊',
            timestamp: new Date(Date.now() - 3500000)
        }
    ]);

    const handleSelectContact = (contact: ChatContact) => {
        setSelectedContact(contact);
        // In real app, load messages for this contact
    };

    const handleSendMessage = () => {
        if (!currentMessage.trim() || !selectedContact) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: currentMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setCurrentMessage('');

        // Update contact's last message
        const contactIndex = MOCK_CONTACTS.findIndex(c => c.id === selectedContact.id);
        if (contactIndex !== -1) {
            MOCK_CONTACTS[contactIndex].lastMessage = currentMessage;
            MOCK_CONTACTS[contactIndex].lastMessageTime = new Date();
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                    <MessageCircle size={28} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark">Comunicación</h1>
                    <p className="text-sm text-gray-500">WhatsApp Business integrado</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex">
                <ContactsList
                    contacts={MOCK_CONTACTS}
                    selectedContact={selectedContact}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSelectContact={handleSelectContact}
                />

                <ChatPanel
                    selectedContact={selectedContact}
                    messages={messages}
                    currentMessage={currentMessage}
                    onMessageChange={setCurrentMessage}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Communication;
