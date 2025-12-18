import React from 'react';
import { Search, User } from 'lucide-react';
import { ChatContact } from '../../../../types';

interface ContactsListProps {
    contacts: ChatContact[];
    selectedContact: ChatContact | null;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSelectContact: (contact: ChatContact) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({
    contacts,
    selectedContact,
    searchTerm,
    onSearchChange,
    onSelectContact
}) => {
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    );

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 bg-[#008069] text-white">
                <h2 className="text-lg font-bold">WhatsApp Business</h2>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-gray-200">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar contacto..."
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                </div>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
                {filteredContacts.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        <p className="text-sm">No hay contactos</p>
                    </div>
                ) : (
                    filteredContacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => onSelectContact(contact)}
                            className={`w-full p-4 border-b border-gray-100 text-left transition-colors hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold shrink-0">
                                    {contact.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-brand-dark text-sm truncate">{contact.name}</h4>
                                        {contact.lastMessageTime && (
                                            <span className="text-[10px] text-gray-500">
                                                {contact.lastMessageTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage || contact.phone}</p>
                                    {contact.unreadCount && contact.unreadCount > 0 && (
                                        <div className="mt-1">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold">
                                                {contact.unreadCount}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};
