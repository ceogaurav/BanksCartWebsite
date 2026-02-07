import React from 'react';
import { X, Check } from 'lucide-react';

interface AvatarSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentAvatar: string;
    onSelectAvatar: (avatarUrl: string) => void;
}

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, currentAvatar, onSelectAvatar }) => {
    if (!isOpen) return null;

    // curated list of "3D-style" or premium avatars
    const avatars = [
        "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
        "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka",
        "https://api.dicebear.com/7.x/notionists/svg?seed=Milo",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Eden",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Gizmo",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Zoey",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Max",
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Choose Avatar</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4">Select a profile picture that represents you.</p>
                    <div className="grid grid-cols-3 gap-4">
                        {avatars.map((avatar, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectAvatar(avatar)}
                                className={`
                                    relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 hover:shadow-md
                                    ${currentAvatar === avatar ? 'border-blue-600 ring-4 ring-blue-50' : 'border-gray-100 hover:border-blue-200'}
                                `}
                            >
                                <img src={avatar} alt={`Avatar ${index}`} className="w-full h-full object-cover" />
                                {currentAvatar === avatar && (
                                    <div className="absolute top-1 right-1 bg-blue-600 text-white p-0.5 rounded-full">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarSelectionModal;
